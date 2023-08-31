/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { Constant } from '../live2dcubismframework';
import { CubismMatrix44 } from '../math/cubismmatrix44';
import { CubismModel } from '../model/cubismmodel';
import { csmMap } from '../type/csmmap';
import { csmRect } from '../type/csmrectf';
import { csmVector } from '../type/csmvector';
import { CubismLogError } from '../utils/cubismdebug';
import {
  CubismBlendMode,
  CubismRenderer,
  CubismTextureColor
} from './cubismrenderer';

const ColorChannelCount = 4; // 実験時に1チャンネルの場合は1、RGBだけの場合は3、アルファも含める場合は4

const shaderCount = 10; // シェーダーの数 = マスク生成用 + (通常用 + 加算 + 乗算) * (マスク無の乗算済アルファ対応版 + マスク有の乗算済アルファ対応版 + マスク有反転の乗算済アルファ対応版)
let s_instance: CubismShader_WebGL;
let s_viewport: number[];
let s_fbo: WebGLFramebuffer;

/**
 * クリッピングマスクの処理を実行するクラス
 */
export class CubismClippingManager_WebGL {
  /**
   * カラーチャンネル（RGBA）のフラグを取得する
   * @param channelNo カラーチャンネル（RGBA）の番号（0:R, 1:G, 2:B, 3:A）
   */
  public getChannelFlagAsColor(channelNo: number): CubismTextureColor {
    return this._channelColors.at(channelNo);
  }

  /**
   * テンポラリのレンダーテクスチャのアドレスを取得する
   * FrameBufferObjectが存在しない場合、新しく生成する
   *
   * @return レンダーテクスチャのアドレス
   */
  public getMaskRenderTexture(): WebGLFramebuffer {
    let ret: WebGLFramebuffer = 0;

    // テンポラリのRenderTextureを取得する
    if (this._maskTexture && this._maskTexture.texture != 0) {
      // 前回使ったものを返す
      this._maskTexture.frameNo = this._currentFrameNo;
      ret = this._maskTexture.texture;
    }

    if (ret == 0) {
      // FrameBufferObjectが存在しない場合、新しく生成する

      // クリッピングバッファサイズを取得
      const size: number = this._clippingMaskBufferSize;

      this._colorBuffer = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, this._colorBuffer);
      this.gl.texImage2D(
        this.gl.TEXTURE_2D,
        0,
        this.gl.RGBA,
        size,
        size,
        0,
        this.gl.RGBA,
        this.gl.UNSIGNED_BYTE,
        null
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_S,
        this.gl.CLAMP_TO_EDGE
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_T,
        this.gl.CLAMP_TO_EDGE
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MIN_FILTER,
        this.gl.LINEAR
      );
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MAG_FILTER,
        this.gl.LINEAR
      );
      this.gl.bindTexture(this.gl.TEXTURE_2D, null);

      ret = this.gl.createFramebuffer();
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, ret);
      this.gl.framebufferTexture2D(
        this.gl.FRAMEBUFFER,
        this.gl.COLOR_ATTACHMENT0,
        this.gl.TEXTURE_2D,
        this._colorBuffer,
        0
      );
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);

      this._maskTexture = new CubismRenderTextureResource(
        this._currentFrameNo,
        ret
      );
    }

    return ret;
  }

  /**
   * WebGLレンダリングコンテキストを設定する
   * @param gl WebGLレンダリングコンテキスト
   */
  public setGL(gl: WebGLRenderingContext): void {
    this.gl = gl;
  }

  /**
   * マスクされる描画オブジェクト群全体を囲む矩形（モデル座標系）を計算する
   * @param model モデルのインスタンス
   * @param clippingContext クリッピングマスクのコンテキスト
   */
  public calcClippedDrawTotalBounds(
    model: CubismModel,
    clippingContext: CubismClippingContext
  ): void {
    // 被クリッピングマスク（マスクされる描画オブジェクト）の全体の矩形
    let clippedDrawTotalMinX: number = Number.MAX_VALUE;
    let clippedDrawTotalMinY: number = Number.MAX_VALUE;
    let clippedDrawTotalMaxX: number = Number.MIN_VALUE;
    let clippedDrawTotalMaxY: number = Number.MIN_VALUE;

    // このマスクが実際に必要か判定する
    // このクリッピングを利用する「描画オブジェクト」がひとつでも使用可能であればマスクを生成する必要がある
    const clippedDrawCount: number =
      clippingContext._clippedDrawableIndexList.length;

    for (
      let clippedDrawableIndex = 0;
      clippedDrawableIndex < clippedDrawCount;
      clippedDrawableIndex++
    ) {
      // マスクを使用する描画オブジェクトの描画される矩形を求める
      const drawableIndex: number =
        clippingContext._clippedDrawableIndexList[clippedDrawableIndex];

      const drawableVertexCount: number = model.getDrawableVertexCount(
        drawableIndex
      );
      const drawableVertexes: Float32Array = model.getDrawableVertices(
        drawableIndex
      );

      let minX: number = Number.MAX_VALUE;
      let minY: number = Number.MAX_VALUE;
      let maxX: number = Number.MIN_VALUE;
      let maxY: number = Number.MIN_VALUE;

      const loop: number = drawableVertexCount * Constant.vertexStep;
      for (
        let pi: number = Constant.vertexOffset;
        pi < loop;
        pi += Constant.vertexStep
      ) {
        const x: number = drawableVertexes[pi];
        const y: number = drawableVertexes[pi + 1];

        if (x < minX) {
          minX = x;
        }
        if (x > maxX) {
          maxX = x;
        }
        if (y < minY) {
          minY = y;
        }
        if (y > maxY) {
          maxY = y;
        }
      }

      // 有効な点が一つも取れなかったのでスキップ
      if (minX == Number.MAX_VALUE) {
        continue;
      }

      // 全体の矩形に反映
      if (minX < clippedDrawTotalMinX) {
        clippedDrawTotalMinX = minX;
      }
      if (minY < clippedDrawTotalMinY) {
        clippedDrawTotalMinY = minY;
      }
      if (maxX > clippedDrawTotalMaxX) {
        clippedDrawTotalMaxX = maxX;
      }
      if (maxY > clippedDrawTotalMaxY) {
        clippedDrawTotalMaxY = maxY;
      }

      if (clippedDrawTotalMinX == Number.MAX_VALUE) {
        clippingContext._allClippedDrawRect.x = 0.0;
        clippingContext._allClippedDrawRect.y = 0.0;
        clippingContext._allClippedDrawRect.width = 0.0;
        clippingContext._allClippedDrawRect.height = 0.0;
        clippingContext._isUsing = false;
      } else {
        clippingContext._isUsing = true;
        const w: number = clippedDrawTotalMaxX - clippedDrawTotalMinX;
        const h: number = clippedDrawTotalMaxY - clippedDrawTotalMinY;
        clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
        clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
        clippingContext._allClippedDrawRect.width = w;
        clippingContext._allClippedDrawRect.height = h;
      }
    }
  }

  /**
   * コンストラクタ
   */
  public constructor() {
    this._maskRenderTexture = null;
    this._colorBuffer = null;
    this._currentFrameNo = 0;
    this._clippingMaskBufferSize = 256;
    this._clippingContextListForMask = new csmVector<CubismClippingContext>();
    this._clippingContextListForDraw = new csmVector<CubismClippingContext>();
    this._channelColors = new csmVector<CubismTextureColor>();
    this._tmpBoundsOnModel = new csmRect();
    this._tmpMatrix = new CubismMatrix44();
    this._tmpMatrixForMask = new CubismMatrix44();
    this._tmpMatrixForDraw = new CubismMatrix44();
    this._maskTexture = null;

    let tmp: CubismTextureColor = new CubismTextureColor();
    tmp.R = 1.0;
    tmp.G = 0.0;
    tmp.B = 0.0;
    tmp.A = 0.0;
    this._channelColors.pushBack(tmp);

    tmp = new CubismTextureColor();
    tmp.R = 0.0;
    tmp.G = 1.0;
    tmp.B = 0.0;
    tmp.A = 0.0;
    this._channelColors.pushBack(tmp);

    tmp = new CubismTextureColor();
    tmp.R = 0.0;
    tmp.G = 0.0;
    tmp.B = 1.0;
    tmp.A = 0.0;
    this._channelColors.pushBack(tmp);

    tmp = new CubismTextureColor();
    tmp.R = 0.0;
    tmp.G = 0.0;
    tmp.B = 0.0;
    tmp.A = 1.0;
    this._channelColors.pushBack(tmp);
  }

  /**
   * デストラクタ相当の処理
   */
  public release(): void {
    for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
      if (this._clippingContextListForMask.at(i)) {
        this._clippingContextListForMask.at(i).release();
        this._clippingContextListForMask.set(i, void 0);
      }
      this._clippingContextListForMask.set(i, null);
    }
    this._clippingContextListForMask = null;

    // _clippingContextListForDrawは_clippingContextListForMaskにあるインスタンスを指している。上記の処理により要素ごとのDELETEは不要。
    for (let i = 0; i < this._clippingContextListForDraw.getSize(); i++) {
      this._clippingContextListForDraw.set(i, null);
    }
    this._clippingContextListForDraw = null;

    if (this._maskTexture) {
      this.gl.deleteFramebuffer(this._maskTexture.texture);
      this._maskTexture = null;
    }

    for (let i = 0; i < this._channelColors.getSize(); i++) {
      this._channelColors.set(i, null);
    }

    this._channelColors = null;

    // テクスチャ解放
    this.gl.deleteTexture(this._colorBuffer);
    this._colorBuffer = null;
  }

  /**
   * マネージャの初期化処理
   * クリッピングマスクを使う描画オブジェクトの登録を行う
   * @param model モデルのインスタンス
   * @param drawableCount 描画オブジェクトの数
   * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのインデックスのリスト
   * @param drawableCounts 描画オブジェクトをマスクする描画オブジェクトの数
   */
  public initialize(
    model: CubismModel,
    drawableCount: number,
    drawableMasks: Int32Array[],
    drawableMaskCounts: Int32Array
  ): void {
    // クリッピングマスクを使う描画オブジェクトをすべて登録する
    // クリッピングマスクは、通常数個程度に限定して使うものとする
    for (let i = 0; i < drawableCount; i++) {
      if (drawableMaskCounts[i] <= 0) {
        // クリッピングマスクが使用されていないアートメッシュ（多くの場合使用しない）
        this._clippingContextListForDraw.pushBack(null);
        continue;
      }

      // 既にあるClipContextと同じかチェックする
      let clippingContext: CubismClippingContext = this.findSameClip(
        drawableMasks[i],
        drawableMaskCounts[i]
      );
      if (clippingContext == null) {
        // 同一のマスクが存在していない場合は生成する
        clippingContext = new CubismClippingContext(
          this,
          drawableMasks[i],
          drawableMaskCounts[i]
        );
        this._clippingContextListForMask.pushBack(clippingContext);
      }

      clippingContext.addClippedDrawable(i);

      this._clippingContextListForDraw.pushBack(clippingContext);
    }
  }

  /**
   * クリッピングコンテキストを作成する。モデル描画時に実行する。
   * @param model モデルのインスタンス
   * @param renderer レンダラのインスタンス
   */
  public setupClippingContext(
    model: CubismModel,
    renderer: CubismRenderer_WebGL
  ): void {
    this._currentFrameNo++;

    // 全てのクリッピングを用意する
    // 同じクリップ（複数の場合はまとめて一つのクリップ）を使う場合は1度だけ設定する
    let usingClipCount = 0;
    for (
      let clipIndex = 0;
      clipIndex < this._clippingContextListForMask.getSize();
      clipIndex++
    ) {
      // 1つのクリッピングマスクに関して
      const cc: CubismClippingContext = this._clippingContextListForMask.at(
        clipIndex
      );

      // このクリップを利用する描画オブジェクト群全体を囲む矩形を計算
      this.calcClippedDrawTotalBounds(model, cc);

      if (cc._isUsing) {
        usingClipCount++; // 使用中としてカウント
      }
    }

    // マスク作成処理
    if (usingClipCount > 0) {
      // 生成したFrameBufferと同じサイズでビューポートを設定
      this.gl.viewport(
        0,
        0,
        this._clippingMaskBufferSize,
        this._clippingMaskBufferSize
      );

      // マスクをactiveにする
      this._maskRenderTexture = this.getMaskRenderTexture();

      // モデル描画時にDrawMeshNowに渡される変換(モデルtoワールド座標変換)
      const modelToWorldF: CubismMatrix44 = renderer.getMvpMatrix();

      renderer.preDraw(); // バッファをクリアする

      // 各マスクのレイアウトを決定していく
      this.setupLayoutBounds(usingClipCount);

      // ---------- マスク描画処理 ----------
      // マスク用RenderTextureをactiveにセット
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._maskRenderTexture);

      // マスクをクリアする
      // (仮仕様) 1が無効（描かれない）領域、0が有効（描かれる）領域。（シェーダーCd*Csで0に近い値をかけてマスクを作る。1をかけると何も起こらない）
      this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);

      // 実際にマスクを生成する
      // 全てのマスクをどのようにレイアウトして描くかを決定し、ClipContext, ClippedDrawContextに記憶する
      for (
        let clipIndex = 0;
        clipIndex < this._clippingContextListForMask.getSize();
        clipIndex++
      ) {
        // --- 実際に1つのマスクを描く ---
        const clipContext: CubismClippingContext = this._clippingContextListForMask.at(
          clipIndex
        );
        const allClipedDrawRect: csmRect = clipContext._allClippedDrawRect; // このマスクを使う、すべての描画オブジェクトの論理座標上の囲み矩形
        const layoutBoundsOnTex01: csmRect = clipContext._layoutBounds; // この中にマスクを収める

        // モデル座標上の矩形を、適宜マージンを付けて使う
        const MARGIN = 0.05;
        this._tmpBoundsOnModel.setRect(allClipedDrawRect);
        this._tmpBoundsOnModel.expand(
          allClipedDrawRect.width * MARGIN,
          allClipedDrawRect.height * MARGIN
        );
        //########## 本来は割り当てられた領域の全体を使わず必要最低限のサイズがよい

        // シェーダ用の計算式を求める。回転を考慮しない場合は以下のとおり
        // movePeriod' = movePeriod * scaleX + offX		  [[ movePeriod' = (movePeriod - tmpBoundsOnModel.movePeriod)*scale + layoutBoundsOnTex01.movePeriod ]]
        const scaleX: number =
          layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
        const scaleY: number =
          layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;

        // マスク生成時に使う行列を求める
        {
          // シェーダに渡す行列を求める <<<<<<<<<<<<<<<<<<<<<<<< 要最適化（逆順に計算すればシンプルにできる）
          this._tmpMatrix.loadIdentity();
          {
            // layout0..1 を -1..1に変換
            this._tmpMatrix.translateRelative(-1.0, -1.0);
            this._tmpMatrix.scaleRelative(2.0, 2.0);
          }
          {
            // view to layout0..1
            this._tmpMatrix.translateRelative(
              layoutBoundsOnTex01.x,
              layoutBoundsOnTex01.y
            );
            this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
            this._tmpMatrix.translateRelative(
              -this._tmpBoundsOnModel.x,
              -this._tmpBoundsOnModel.y
            );
            // new = [translate][scale][translate]
          }
          // tmpMatrixForMaskが計算結果
          this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
        }

        //--------- draw時の mask 参照用行列を計算
        {
          // シェーダに渡す行列を求める <<<<<<<<<<<<<<<<<<<<<<<< 要最適化（逆順に計算すればシンプルにできる）
          this._tmpMatrix.loadIdentity();
          {
            this._tmpMatrix.translateRelative(
              layoutBoundsOnTex01.x,
              layoutBoundsOnTex01.y
            );
            this._tmpMatrix.scaleRelative(scaleX, scaleY); // new = [translate][scale]
            this._tmpMatrix.translateRelative(
              -this._tmpBoundsOnModel.x,
              -this._tmpBoundsOnModel.y
            );
            // new = [translate][scale][translate]
          }
          this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
        }
        clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
        clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());

        const clipDrawCount: number = clipContext._clippingIdCount;
        for (let i = 0; i < clipDrawCount; i++) {
          const clipDrawIndex: number = clipContext._clippingIdList[i];

          // 頂点情報が更新されておらず、信頼性がない場合は描画をパスする
          if (
            !model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)
          ) {
            continue;
          }

          renderer.setIsCulling(
            model.getDrawableCulling(clipDrawIndex) != false
          );

          // 今回専用の変換を適用して描く
          // チャンネルも切り替える必要がある(A,R,G,B)
          renderer.setClippingContextBufferForMask(clipContext);
          renderer.drawMesh(
            model.getDrawableTextureIndices(clipDrawIndex),
            model.getDrawableVertexIndexCount(clipDrawIndex),
            model.getDrawableVertexCount(clipDrawIndex),
            model.getDrawableVertexIndices(clipDrawIndex),
            model.getDrawableVertices(clipDrawIndex),
            model.getDrawableVertexUvs(clipDrawIndex),
            model.getDrawableOpacity(clipDrawIndex),
            CubismBlendMode.CubismBlendMode_Normal, // クリッピングは通常描画を強制
            false // マスク生成時はクリッピングの反転使用は全く関係がない
          );
        }
      }

      // --- 後処理 ---
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo); // 描画対象を戻す
      renderer.setClippingContextBufferForMask(null);

      this.gl.viewport(
        s_viewport[0],
        s_viewport[1],
        s_viewport[2],
        s_viewport[3]
      );
    }
  }

  /**
   * 既にマスクを作っているかを確認
   * 作っている様であれば該当するクリッピングマスクのインスタンスを返す
   * 作っていなければNULLを返す
   * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのリスト
   * @param drawableMaskCounts 描画オブジェクトをマスクする描画オブジェクトの数
   * @return 該当するクリッピングマスクが存在すればインスタンスを返し、なければNULLを返す
   */
  public findSameClip(
    drawableMasks: Int32Array,
    drawableMaskCounts: number
  ): CubismClippingContext {
    // 作成済みClippingContextと一致するか確認
    for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
      const clippingContext: CubismClippingContext = this._clippingContextListForMask.at(
        i
      );
      const count: number = clippingContext._clippingIdCount;

      // 個数が違う場合は別物
      if (count != drawableMaskCounts) {
        continue;
      }

      let sameCount = 0;

      // 同じIDを持つか確認。配列の数が同じなので、一致した個数が同じなら同じ物を持つとする
      for (let j = 0; j < count; j++) {
        const clipId: number = clippingContext._clippingIdList[j];

        for (let k = 0; k < count; k++) {
          if (drawableMasks[k] == clipId) {
            sameCount++;
            break;
          }
        }
      }

      if (sameCount == count) {
        return clippingContext;
      }
    }

    return null; // 見つからなかった
  }

  /**
   * クリッピングコンテキストを配置するレイアウト
   * 一つのレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする
   * マスクグループの数が4以下ならRGBA各チャンネルに一つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する。
   *
   * @param usingClipCount 配置するクリッピングコンテキストの数
   */
  public setupLayoutBounds(usingClipCount: number): void {
    // ひとつのRenderTextureを極力いっぱいに使ってマスクをレイアウトする
    // マスクグループの数が4以下ならRGBA各チャンネルに1つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する

    // RGBAを順番に使っていく
    let div: number = usingClipCount / ColorChannelCount; // 1チャンネルに配置する基本のマスク
    let mod: number = usingClipCount % ColorChannelCount; // 余り、この番号のチャンネルまでに一つずつ配分する

    // 小数点は切り捨てる
    div = ~~div;
    mod = ~~mod;

    // RGBAそれぞれのチャンネルを用意していく（0:R, 1:G, 2:B, 3:A）
    let curClipIndex = 0; // 順番に設定していく

    for (let channelNo = 0; channelNo < ColorChannelCount; channelNo++) {
      // このチャンネルにレイアウトする数
      const layoutCount: number = div + (channelNo < mod ? 1 : 0);

      // 分割方法を決定する
      if (layoutCount == 0) {
        // 何もしない
      } else if (layoutCount == 1) {
        // 全てをそのまま使う
        const clipContext: CubismClippingContext = this._clippingContextListForMask.at(
          curClipIndex++
        );
        clipContext._layoutChannelNo = channelNo;
        clipContext._layoutBounds.x = 0.0;
        clipContext._layoutBounds.y = 0.0;
        clipContext._layoutBounds.width = 1.0;
        clipContext._layoutBounds.height = 1.0;
      } else if (layoutCount == 2) {
        for (let i = 0; i < layoutCount; i++) {
          let xpos: number = i % 2;

          // 小数点は切り捨てる
          xpos = ~~xpos;

          const cc: CubismClippingContext = this._clippingContextListForMask.at(
            curClipIndex++
          );
          cc._layoutChannelNo = channelNo;

          cc._layoutBounds.x = xpos * 0.5;
          cc._layoutBounds.y = 0.0;
          cc._layoutBounds.width = 0.5;
          cc._layoutBounds.height = 1.0;
          // UVを2つに分解して使う
        }
      } else if (layoutCount <= 4) {
        // 4分割して使う
        for (let i = 0; i < layoutCount; i++) {
          let xpos: number = i % 2;
          let ypos: number = i / 2;

          // 小数点は切り捨てる
          xpos = ~~xpos;
          ypos = ~~ypos;

          const cc = this._clippingContextListForMask.at(curClipIndex++);
          cc._layoutChannelNo = channelNo;

          cc._layoutBounds.x = xpos * 0.5;
          cc._layoutBounds.y = ypos * 0.5;
          cc._layoutBounds.width = 0.5;
          cc._layoutBounds.height = 0.5;
        }
      } else if (layoutCount <= 9) {
        // 9分割して使う
        for (let i = 0; i < layoutCount; i++) {
          let xpos = i % 3;
          let ypos = i / 3;

          // 小数点は切り捨てる
          xpos = ~~xpos;
          ypos = ~~ypos;

          const cc: CubismClippingContext = this._clippingContextListForMask.at(
            curClipIndex++
          );
          cc._layoutChannelNo = channelNo;

          cc._layoutBounds.x = xpos / 3.0;
          cc._layoutBounds.y = ypos / 3.0;
          cc._layoutBounds.width = 1.0 / 3.0;
          cc._layoutBounds.height = 1.0 / 3.0;
        }
      } else {
        CubismLogError('not supported mask count : {0}', layoutCount);
      }
    }
  }

  /**
   * カラーバッファを取得する
   * @return カラーバッファ
   */
  public getColorBuffer(): WebGLTexture {
    return this._colorBuffer;
  }

  /**
   * 画面描画に使用するクリッピングマスクのリストを取得する
   * @return 画面描画に使用するクリッピングマスクのリスト
   */
  public getClippingContextListForDraw(): csmVector<CubismClippingContext> {
    return this._clippingContextListForDraw;
  }

  /**
   * クリッピングマスクバッファのサイズを設定する
   * @param size クリッピングマスクバッファのサイズ
   */
  public setClippingMaskBufferSize(size: number): void {
    this._clippingMaskBufferSize = size;
  }

  /**
   * クリッピングマスクバッファのサイズを取得する
   * @return クリッピングマスクバッファのサイズ
   */
  public getClippingMaskBufferSize(): number {
    return this._clippingMaskBufferSize;
  }

  public _maskRenderTexture: WebGLFramebuffer; // マスク用レンダーテクスチャのアドレス
  public _colorBuffer: WebGLTexture; // マスク用カラーバッファーのアドレス
  public _currentFrameNo: number; // マスクテクスチャに与えるフレーム番号

  public _channelColors: csmVector<CubismTextureColor>;
  public _maskTexture: CubismRenderTextureResource; // マスク用のテクスチャリソースのリスト
  public _clippingContextListForMask: csmVector<CubismClippingContext>; // マスク用クリッピングコンテキストのリスト
  public _clippingContextListForDraw: csmVector<CubismClippingContext>; // 描画用クリッピングコンテキストのリスト
  public _clippingMaskBufferSize: number; // クリッピングマスクのバッファサイズ（初期値:256）

  private _tmpMatrix: CubismMatrix44; // マスク計算用の行列
  private _tmpMatrixForMask: CubismMatrix44; // マスク計算用の行列
  private _tmpMatrixForDraw: CubismMatrix44; // マスク計算用の行列
  private _tmpBoundsOnModel: csmRect; // マスク配置計算用の矩形

  gl: WebGLRenderingContext; // WebGLレンダリングコンテキスト
}

/**
 * レンダーテクスチャのリソースを定義する構造体
 * クリッピングマスクで使用する
 */
export class CubismRenderTextureResource {
  /**
   * 引数付きコンストラクタ
   * @param frameNo レンダラーのフレーム番号
   * @param texture テクスチャのアドレス
   */
  public constructor(frameNo: number, texture: WebGLFramebuffer) {
    this.frameNo = frameNo;
    this.texture = texture;
  }

  public frameNo: number; // レンダラのフレーム番号
  public texture: WebGLFramebuffer; // テクスチャのアドレス
}

/**
 * クリッピングマスクのコンテキスト
 */
export class CubismClippingContext {
  /**
   * 引数付きコンストラクタ
   */
  public constructor(
    manager: CubismClippingManager_WebGL,
    clippingDrawableIndices: Int32Array,
    clipCount: number
  ) {
    this._owner = manager;

    // クリップしている（＝マスク用の）Drawableのインデックスリスト
    this._clippingIdList = clippingDrawableIndices;

    // マスクの数
    this._clippingIdCount = clipCount;

    this._allClippedDrawRect = new csmRect();
    this._layoutBounds = new csmRect();

    this._clippedDrawableIndexList = [];

    this._matrixForMask = new CubismMatrix44();
    this._matrixForDraw = new CubismMatrix44();
  }

  /**
   * デストラクタ相当の処理
   */
  public release(): void {
    if (this._layoutBounds != null) {
      this._layoutBounds = null;
    }

    if (this._allClippedDrawRect != null) {
      this._allClippedDrawRect = null;
    }

    if (this._clippedDrawableIndexList != null) {
      this._clippedDrawableIndexList = null;
    }
  }

  /**
   * このマスクにクリップされる描画オブジェクトを追加する
   *
   * @param drawableIndex クリッピング対象に追加する描画オブジェクトのインデックス
   */
  public addClippedDrawable(drawableIndex: number) {
    this._clippedDrawableIndexList.push(drawableIndex);
  }

  /**
   * このマスクを管理するマネージャのインスタンスを取得する
   * @return クリッピングマネージャのインスタンス
   */
  public getClippingManager(): CubismClippingManager_WebGL {
    return this._owner;
  }

  public setGl(gl: WebGLRenderingContext): void {
    this._owner.setGL(gl);
  }

  public _isUsing: boolean; // 現在の描画状態でマスクの準備が必要ならtrue
  public readonly _clippingIdList: Int32Array; // クリッピングマスクのIDリスト
  public _clippingIdCount: number; // クリッピングマスクの数
  public _layoutChannelNo: number; // RGBAのいずれのチャンネルにこのクリップを配置するか（0:R, 1:G, 2:B, 3:A）
  public _layoutBounds: csmRect; // マスク用チャンネルのどの領域にマスクを入れるか（View座標-1~1, UVは0~1に直す）
  public _allClippedDrawRect: csmRect; // このクリッピングで、クリッピングされるすべての描画オブジェクトの囲み矩形（毎回更新）
  public _matrixForMask: CubismMatrix44; // マスクの位置計算結果を保持する行列
  public _matrixForDraw: CubismMatrix44; // 描画オブジェクトの位置計算結果を保持する行列
  public _clippedDrawableIndexList: number[]; // このマスクにクリップされる描画オブジェクトのリスト

  private _owner: CubismClippingManager_WebGL; // このマスクを管理しているマネージャのインスタンス
}

/**
 * WebGL用のシェーダープログラムを生成・破棄するクラス
 * シングルトンなクラスであり、CubismShader_WebGL.getInstanceからアクセスする。
 */
export class CubismShader_WebGL {
  /**
   * インスタンスを取得する（シングルトン）
   * @return インスタンス
   */
  public static getInstance(): CubismShader_WebGL {
    if (s_instance == null) {
      s_instance = new CubismShader_WebGL();

      return s_instance;
    }
    return s_instance;
  }

  /**
   * インスタンスを開放する（シングルトン）
   */
  public static deleteInstance(): void {
    if (s_instance) {
      s_instance.release();
      s_instance = null;
    }
  }

  /**
   * privateなコンストラクタ
   */
  private constructor() {
    this._shaderSets = new csmVector<CubismShaderSet>();
  }

  /**
   * デストラクタ相当の処理
   */
  public release(): void {
    this.releaseShaderProgram();
  }

  /**
   * シェーダープログラムの一連のセットアップを実行する
   * @param renderer レンダラのインスタンス
   * @param textureId GPUのテクスチャID
   * @param vertexCount ポリゴンメッシュの頂点数
   * @param vertexArray ポリゴンメッシュの頂点配列
   * @param indexArray インデックスバッファの頂点配列
   * @param uvArray uv配列
   * @param opacity 不透明度
   * @param colorBlendMode カラーブレンディングのタイプ
   * @param baseColor ベースカラー
   * @param isPremultipliedAlpha 乗算済みアルファかどうか
   * @param matrix4x4 Model-View-Projection行列
   * @param invertedMask マスクを反転して使用するフラグ
   */
  public setupShaderProgram(
    renderer: CubismRenderer_WebGL,
    textureId: WebGLTexture,
    vertexCount: number,
    vertexArray: Float32Array,
    indexArray: Uint16Array,
    uvArray: Float32Array,
    bufferData: {
      vertex: WebGLBuffer;
      uv: WebGLBuffer;
      index: WebGLBuffer;
    },
    opacity: number,
    colorBlendMode: CubismBlendMode,
    baseColor: CubismTextureColor,
    isPremultipliedAlpha: boolean,
    matrix4x4: CubismMatrix44,
    invertedMask: boolean
  ): void {
    if (!isPremultipliedAlpha) {
      CubismLogError('NoPremultipliedAlpha is not allowed');
    }

    if (this._shaderSets.getSize() == 0) {
      this.generateShaders();
    }

    // Blending
    let SRC_COLOR: number;
    let DST_COLOR: number;
    let SRC_ALPHA: number;
    let DST_ALPHA: number;

    if (renderer.getClippingContextBufferForMask() != null) {
      // マスク生成時
      const shaderSet: CubismShaderSet = this._shaderSets.at(
        ShaderNames.ShaderNames_SetupMask
      );
      this.gl.useProgram(shaderSet.shaderProgram);

      // テクスチャ設定
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
      this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);

      // 頂点配列の設定(VBO)
      if (bufferData.vertex == null) {
        bufferData.vertex = this.gl.createBuffer();
      }
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        vertexArray,
        this.gl.DYNAMIC_DRAW
      );
      this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
      this.gl.vertexAttribPointer(
        shaderSet.attributePositionLocation,
        2,
        this.gl.FLOAT,
        false,
        0,
        0
      );

      // テクスチャ頂点の設定
      if (bufferData.uv == null) {
        bufferData.uv = this.gl.createBuffer();
      }
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
      this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
      this.gl.vertexAttribPointer(
        shaderSet.attributeTexCoordLocation,
        2,
        this.gl.FLOAT,
        false,
        0,
        0
      );

      // チャンネル
      const channelNo: number = renderer.getClippingContextBufferForMask()
        ._layoutChannelNo;
      const colorChannel: CubismTextureColor = renderer
        .getClippingContextBufferForMask()
        .getClippingManager()
        .getChannelFlagAsColor(channelNo);
      this.gl.uniform4f(
        shaderSet.uniformChannelFlagLocation,
        colorChannel.R,
        colorChannel.G,
        colorChannel.B,
        colorChannel.A
      );

      this.gl.uniformMatrix4fv(
        shaderSet.uniformClipMatrixLocation,
        false,
        renderer.getClippingContextBufferForMask()._matrixForMask.getArray()
      );

      const rect: csmRect = renderer.getClippingContextBufferForMask()
        ._layoutBounds;

      this.gl.uniform4f(
        shaderSet.uniformBaseColorLocation,
        rect.x * 2.0 - 1.0,
        rect.y * 2.0 - 1.0,
        rect.getRight() * 2.0 - 1.0,
        rect.getBottom() * 2.0 - 1.0
      );

      SRC_COLOR = this.gl.ZERO;
      DST_COLOR = this.gl.ONE_MINUS_SRC_COLOR;
      SRC_ALPHA = this.gl.ZERO;
      DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
    } // マスク生成以外の場合
    else {
      const masked: boolean =
        renderer.getClippingContextBufferForDraw() != null; // この描画オブジェクトはマスク対象か
      const offset: number = masked ? (invertedMask ? 2 : 1) : 0;

      let shaderSet: CubismShaderSet = new CubismShaderSet();

      switch (colorBlendMode) {
        case CubismBlendMode.CubismBlendMode_Normal:
        default:
          shaderSet = this._shaderSets.at(
            ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset
          );
          SRC_COLOR = this.gl.ONE;
          DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
          SRC_ALPHA = this.gl.ONE;
          DST_ALPHA = this.gl.ONE_MINUS_SRC_ALPHA;
          break;

        case CubismBlendMode.CubismBlendMode_Additive:
          shaderSet = this._shaderSets.at(
            ShaderNames.ShaderNames_AddPremultipliedAlpha + offset
          );
          SRC_COLOR = this.gl.ONE;
          DST_COLOR = this.gl.ONE;
          SRC_ALPHA = this.gl.ZERO;
          DST_ALPHA = this.gl.ONE;
          break;

        case CubismBlendMode.CubismBlendMode_Multiplicative:
          shaderSet = this._shaderSets.at(
            ShaderNames.ShaderNames_MultPremultipliedAlpha + offset
          );
          SRC_COLOR = this.gl.DST_COLOR;
          DST_COLOR = this.gl.ONE_MINUS_SRC_ALPHA;
          SRC_ALPHA = this.gl.ZERO;
          DST_ALPHA = this.gl.ONE;
          break;
      }

      this.gl.useProgram(shaderSet.shaderProgram);

      // 頂点配列の設定
      if (bufferData.vertex == null) {
        bufferData.vertex = this.gl.createBuffer();
      }
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.vertex);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        vertexArray,
        this.gl.DYNAMIC_DRAW
      );
      this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
      this.gl.vertexAttribPointer(
        shaderSet.attributePositionLocation,
        2,
        this.gl.FLOAT,
        false,
        0,
        0
      );

      // テクスチャ頂点の設定
      if (bufferData.uv == null) {
        bufferData.uv = this.gl.createBuffer();
      }
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferData.uv);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
      this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
      this.gl.vertexAttribPointer(
        shaderSet.attributeTexCoordLocation,
        2,
        this.gl.FLOAT,
        false,
        0,
        0
      );

      if (masked) {
        this.gl.activeTexture(this.gl.TEXTURE1);
        const tex: WebGLTexture = renderer
          .getClippingContextBufferForDraw()
          .getClippingManager()
          .getColorBuffer();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);

        // view座標をClippingContextの座標に変換するための行列を設定
        this.gl.uniformMatrix4fv(
          shaderSet.uniformClipMatrixLocation,
          false,
          renderer.getClippingContextBufferForDraw()._matrixForDraw.getArray()
        );

        // 使用するカラーチャンネルを設定
        const channelNo: number = renderer.getClippingContextBufferForDraw()
          ._layoutChannelNo;
        const colorChannel: CubismTextureColor = renderer
          .getClippingContextBufferForDraw()
          .getClippingManager()
          .getChannelFlagAsColor(channelNo);
        this.gl.uniform4f(
          shaderSet.uniformChannelFlagLocation,
          colorChannel.R,
          colorChannel.G,
          colorChannel.B,
          colorChannel.A
        );
      }

      // テクスチャ設定
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
      this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);

      // 座標変換
      this.gl.uniformMatrix4fv(
        shaderSet.uniformMatrixLocation,
        false,
        matrix4x4.getArray()
      );

      this.gl.uniform4f(
        shaderSet.uniformBaseColorLocation,
        baseColor.R,
        baseColor.G,
        baseColor.B,
        baseColor.A
      );
    }

    // IBOを作成し、データを転送
    if (bufferData.index == null) {
      bufferData.index = this.gl.createBuffer();
    }
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, bufferData.index);
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      indexArray,
      this.gl.DYNAMIC_DRAW
    );
    this.gl.blendFuncSeparate(SRC_COLOR, DST_COLOR, SRC_ALPHA, DST_ALPHA);
  }

  /**
   * シェーダープログラムを解放する
   */
  public releaseShaderProgram(): void {
    for (let i = 0; i < this._shaderSets.getSize(); i++) {
      this.gl.deleteProgram(this._shaderSets.at(i).shaderProgram);
      this._shaderSets.at(i).shaderProgram = 0;
      this._shaderSets.set(i, void 0);
      this._shaderSets.set(i, null);
    }
  }

  /**
   * シェーダープログラムを初期化する
   * @param vertShaderSrc 頂点シェーダのソース
   * @param fragShaderSrc フラグメントシェーダのソース
   */
  public generateShaders(): void {
    for (let i = 0; i < shaderCount; i++) {
      this._shaderSets.pushBack(new CubismShaderSet());
    }

    this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(
      vertexShaderSrcSetupMask,
      fragmentShaderSrcsetupMask
    );

    this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(
      vertexShaderSrc,
      fragmentShaderSrcPremultipliedAlpha
    );
    this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(
      vertexShaderSrcMasked,
      fragmentShaderSrcMaskPremultipliedAlpha
    );
    this._shaderSets.at(3).shaderProgram = this.loadShaderProgram(
      vertexShaderSrcMasked,
      fragmentShaderSrcMaskInvertedPremultipliedAlpha
    );

    // 加算も通常と同じシェーダーを利用する
    this._shaderSets.at(4).shaderProgram = this._shaderSets.at(1).shaderProgram;
    this._shaderSets.at(5).shaderProgram = this._shaderSets.at(2).shaderProgram;
    this._shaderSets.at(6).shaderProgram = this._shaderSets.at(3).shaderProgram;

    // 乗算も通常と同じシェーダーを利用する
    this._shaderSets.at(7).shaderProgram = this._shaderSets.at(1).shaderProgram;
    this._shaderSets.at(8).shaderProgram = this._shaderSets.at(2).shaderProgram;
    this._shaderSets.at(9).shaderProgram = this._shaderSets.at(3).shaderProgram;

    // SetupMask
    this._shaderSets.at(
      0
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(0).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      0
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(0).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(0).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(0).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(
      0
    ).uniformClipMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(0).shaderProgram,
      'u_clipMatrix'
    );
    this._shaderSets.at(
      0
    ).uniformChannelFlagLocation = this.gl.getUniformLocation(
      this._shaderSets.at(0).shaderProgram,
      'u_channelFlag'
    );
    this._shaderSets.at(
      0
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(0).shaderProgram,
      'u_baseColor'
    );

    // 通常（PremultipliedAlpha）
    this._shaderSets.at(
      1
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(1).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      1
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(1).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(1).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(1).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(1).uniformMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(1).shaderProgram,
      'u_matrix'
    );
    this._shaderSets.at(
      1
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(1).shaderProgram,
      'u_baseColor'
    );

    // 通常（クリッピング、PremultipliedAlpha）
    this._shaderSets.at(
      2
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(2).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      2
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(2).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(2).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(2).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(2).samplerTexture1Location = this.gl.getUniformLocation(
      this._shaderSets.at(2).shaderProgram,
      's_texture1'
    );
    this._shaderSets.at(2).uniformMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(2).shaderProgram,
      'u_matrix'
    );
    this._shaderSets.at(
      2
    ).uniformClipMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(2).shaderProgram,
      'u_clipMatrix'
    );
    this._shaderSets.at(
      2
    ).uniformChannelFlagLocation = this.gl.getUniformLocation(
      this._shaderSets.at(2).shaderProgram,
      'u_channelFlag'
    );
    this._shaderSets.at(
      2
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(2).shaderProgram,
      'u_baseColor'
    );

    // 通常（クリッピング・反転, PremultipliedAlpha）
    this._shaderSets.at(
      3
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(3).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      3
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(3).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(3).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(3).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(3).samplerTexture1Location = this.gl.getUniformLocation(
      this._shaderSets.at(3).shaderProgram,
      's_texture1'
    );
    this._shaderSets.at(3).uniformMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(3).shaderProgram,
      'u_matrix'
    );
    this._shaderSets.at(
      3
    ).uniformClipMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(3).shaderProgram,
      'u_clipMatrix'
    );
    this._shaderSets.at(
      3
    ).uniformChannelFlagLocation = this.gl.getUniformLocation(
      this._shaderSets.at(3).shaderProgram,
      'u_channelFlag'
    );
    this._shaderSets.at(
      3
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(3).shaderProgram,
      'u_baseColor'
    );

    // 加算（PremultipliedAlpha）
    this._shaderSets.at(
      4
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(4).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      4
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(4).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(4).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(4).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(4).uniformMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(4).shaderProgram,
      'u_matrix'
    );
    this._shaderSets.at(
      4
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(4).shaderProgram,
      'u_baseColor'
    );

    // 加算（クリッピング、PremultipliedAlpha）
    this._shaderSets.at(
      5
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(5).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      5
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(5).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(5).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(5).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(5).samplerTexture1Location = this.gl.getUniformLocation(
      this._shaderSets.at(5).shaderProgram,
      's_texture1'
    );
    this._shaderSets.at(5).uniformMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(5).shaderProgram,
      'u_matrix'
    );
    this._shaderSets.at(
      5
    ).uniformClipMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(5).shaderProgram,
      'u_clipMatrix'
    );
    this._shaderSets.at(
      5
    ).uniformChannelFlagLocation = this.gl.getUniformLocation(
      this._shaderSets.at(5).shaderProgram,
      'u_channelFlag'
    );
    this._shaderSets.at(
      5
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(5).shaderProgram,
      'u_baseColor'
    );

    // 加算（クリッピング・反転、PremultipliedAlpha）
    this._shaderSets.at(
      6
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(6).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      6
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(6).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(6).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(6).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(6).samplerTexture1Location = this.gl.getUniformLocation(
      this._shaderSets.at(6).shaderProgram,
      's_texture1'
    );
    this._shaderSets.at(6).uniformMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(6).shaderProgram,
      'u_matrix'
    );
    this._shaderSets.at(
      6
    ).uniformClipMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(6).shaderProgram,
      'u_clipMatrix'
    );
    this._shaderSets.at(
      6
    ).uniformChannelFlagLocation = this.gl.getUniformLocation(
      this._shaderSets.at(6).shaderProgram,
      'u_channelFlag'
    );
    this._shaderSets.at(
      6
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(6).shaderProgram,
      'u_baseColor'
    );

    // 乗算（PremultipliedAlpha）
    this._shaderSets.at(
      7
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(7).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      7
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(7).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(7).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(7).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(7).uniformMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(7).shaderProgram,
      'u_matrix'
    );
    this._shaderSets.at(
      7
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(7).shaderProgram,
      'u_baseColor'
    );

    // 乗算（クリッピング、PremultipliedAlpha）
    this._shaderSets.at(
      8
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(8).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      8
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(8).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(8).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(8).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(8).samplerTexture1Location = this.gl.getUniformLocation(
      this._shaderSets.at(8).shaderProgram,
      's_texture1'
    );
    this._shaderSets.at(8).uniformMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(8).shaderProgram,
      'u_matrix'
    );
    this._shaderSets.at(
      8
    ).uniformClipMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(8).shaderProgram,
      'u_clipMatrix'
    );
    this._shaderSets.at(
      8
    ).uniformChannelFlagLocation = this.gl.getUniformLocation(
      this._shaderSets.at(8).shaderProgram,
      'u_channelFlag'
    );
    this._shaderSets.at(
      8
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(8).shaderProgram,
      'u_baseColor'
    );

    // 乗算（クリッピング・反転、PremultipliedAlpha）
    this._shaderSets.at(
      9
    ).attributePositionLocation = this.gl.getAttribLocation(
      this._shaderSets.at(9).shaderProgram,
      'a_position'
    );
    this._shaderSets.at(
      9
    ).attributeTexCoordLocation = this.gl.getAttribLocation(
      this._shaderSets.at(9).shaderProgram,
      'a_texCoord'
    );
    this._shaderSets.at(9).samplerTexture0Location = this.gl.getUniformLocation(
      this._shaderSets.at(9).shaderProgram,
      's_texture0'
    );
    this._shaderSets.at(9).samplerTexture1Location = this.gl.getUniformLocation(
      this._shaderSets.at(9).shaderProgram,
      's_texture1'
    );
    this._shaderSets.at(9).uniformMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(9).shaderProgram,
      'u_matrix'
    );
    this._shaderSets.at(
      9
    ).uniformClipMatrixLocation = this.gl.getUniformLocation(
      this._shaderSets.at(9).shaderProgram,
      'u_clipMatrix'
    );
    this._shaderSets.at(
      9
    ).uniformChannelFlagLocation = this.gl.getUniformLocation(
      this._shaderSets.at(9).shaderProgram,
      'u_channelFlag'
    );
    this._shaderSets.at(
      9
    ).uniformBaseColorLocation = this.gl.getUniformLocation(
      this._shaderSets.at(9).shaderProgram,
      'u_baseColor'
    );
  }

  /**
   * シェーダプログラムをロードしてアドレスを返す
   * @param vertexShaderSource    頂点シェーダのソース
   * @param fragmentShaderSource  フラグメントシェーダのソース
   * @return シェーダプログラムのアドレス
   */
  public loadShaderProgram(
    vertexShaderSource: string,
    fragmentShaderSource: string
  ): WebGLProgram {
    // Create Shader Program
    let shaderProgram: WebGLProgram = this.gl.createProgram();

    let vertShader = this.compileShaderSource(
      this.gl.VERTEX_SHADER,
      vertexShaderSource
    );

    if (!vertShader) {
      CubismLogError('Vertex shader compile error!');
      return 0;
    }

    let fragShader = this.compileShaderSource(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!fragShader) {
      CubismLogError('Vertex shader compile error!');
      return 0;
    }

    // Attach vertex shader to program
    this.gl.attachShader(shaderProgram, vertShader);

    // Attach fragment shader to program
    this.gl.attachShader(shaderProgram, fragShader);

    // link program
    this.gl.linkProgram(shaderProgram);
    const linkStatus = this.gl.getProgramParameter(
      shaderProgram,
      this.gl.LINK_STATUS
    );

    // リンクに失敗したらシェーダーを削除
    if (!linkStatus) {
      CubismLogError('Failed to link program: {0}', shaderProgram);

      this.gl.deleteShader(vertShader);
      vertShader = 0;

      this.gl.deleteShader(fragShader);
      fragShader = 0;

      if (shaderProgram) {
        this.gl.deleteProgram(shaderProgram);
        shaderProgram = 0;
      }

      return 0;
    }

    // Release vertex and fragment shaders.
    this.gl.deleteShader(vertShader);
    this.gl.deleteShader(fragShader);

    return shaderProgram;
  }

  /**
   * シェーダープログラムをコンパイルする
   * @param shaderType シェーダタイプ(Vertex/Fragment)
   * @param shaderSource シェーダソースコード
   *
   * @return コンパイルされたシェーダープログラム
   */
  public compileShaderSource(
    shaderType: GLenum,
    shaderSource: string
  ): WebGLProgram {
    const source: string = shaderSource;

    const shader: WebGLProgram = this.gl.createShader(shaderType);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!shader) {
      const log: string = this.gl.getShaderInfoLog(shader);
      CubismLogError('Shader compile log: {0} ', log);
    }

    const status: any = this.gl.getShaderParameter(
      shader,
      this.gl.COMPILE_STATUS
    );
    if (!status) {
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  public setGl(gl: WebGLRenderingContext): void {
    this.gl = gl;
  }

  _shaderSets: csmVector<CubismShaderSet>; // ロードしたシェーダープログラムを保持する変数
  gl: WebGLRenderingContext; // webglコンテキスト
}

/**
 * CubismShader_WebGLのインナークラス
 */
export class CubismShaderSet {
  shaderProgram: WebGLProgram; // シェーダープログラムのアドレス
  attributePositionLocation: GLuint; // シェーダープログラムに渡す変数のアドレス（Position）
  attributeTexCoordLocation: GLuint; // シェーダープログラムに渡す変数のアドレス（TexCoord）
  uniformMatrixLocation: WebGLUniformLocation; // シェーダープログラムに渡す変数のアドレス（Matrix）
  uniformClipMatrixLocation: WebGLUniformLocation; // シェーダープログラムに渡す変数のアドレス（ClipMatrix）
  samplerTexture0Location: WebGLUniformLocation; // シェーダープログラムに渡す変数のアドレス（Texture0）
  samplerTexture1Location: WebGLUniformLocation; // シェーダープログラムに渡す変数のアドレス（Texture1）
  uniformBaseColorLocation: WebGLUniformLocation; // シェーダープログラムに渡す変数のアドレス（BaseColor）
  uniformChannelFlagLocation: WebGLUniformLocation; // シェーダープログラムに渡す変数のアドレス（ChannelFlag）
}

export enum ShaderNames {
  // SetupMask
  ShaderNames_SetupMask,

  // Normal
  ShaderNames_NormalPremultipliedAlpha,
  ShaderNames_NormalMaskedPremultipliedAlpha,
  ShaderNames_NomralMaskedInvertedPremultipliedAlpha,

  // Add
  ShaderNames_AddPremultipliedAlpha,
  ShaderNames_AddMaskedPremultipliedAlpha,
  ShaderNames_AddMaskedPremultipliedAlphaInverted,

  // Mult
  ShaderNames_MultPremultipliedAlpha,
  ShaderNames_MultMaskedPremultipliedAlpha,
  ShaderNames_MultMaskedPremultipliedAlphaInverted
}

export const vertexShaderSrcSetupMask =
  'attribute vec4     a_position;' +
  'attribute vec2     a_texCoord;' +
  'varying vec2       v_texCoord;' +
  'varying vec4       v_myPos;' +
  'uniform mat4       u_clipMatrix;' +
  'void main()' +
  '{' +
  '   gl_Position = u_clipMatrix * a_position;' +
  '   v_myPos = u_clipMatrix * a_position;' +
  '   v_texCoord = a_texCoord;' +
  '   v_texCoord.y = 1.0 - v_texCoord.y;' +
  '}';
export const fragmentShaderSrcsetupMask =
  'precision mediump float;' +
  'varying vec2       v_texCoord;' +
  'varying vec4       v_myPos;' +
  'uniform vec4       u_baseColor;' +
  'uniform vec4       u_channelFlag;' +
  'uniform sampler2D  s_texture0;' +
  'void main()' +
  '{' +
  '   float isInside = ' +
  '       step(u_baseColor.x, v_myPos.x/v_myPos.w)' +
  '       * step(u_baseColor.y, v_myPos.y/v_myPos.w)' +
  '       * step(v_myPos.x/v_myPos.w, u_baseColor.z)' +
  '       * step(v_myPos.y/v_myPos.w, u_baseColor.w);' +
  '   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;' +
  '}';

//----- バーテックスシェーダプログラム -----
// Normal & Add & Mult 共通
export const vertexShaderSrc =
  'attribute vec4     a_position;' + //v.vertex
  'attribute vec2     a_texCoord;' + //v.texcoord
  'varying vec2       v_texCoord;' + //v2f.texcoord
  'uniform mat4       u_matrix;' +
  'void main()' +
  '{' +
  '   gl_Position = u_matrix * a_position;' +
  '   v_texCoord = a_texCoord;' +
  '   v_texCoord.y = 1.0 - v_texCoord.y;' +
  '}';

// Normal & Add & Mult 共通（クリッピングされたものの描画用）
export const vertexShaderSrcMasked =
  'attribute vec4     a_position;' +
  'attribute vec2     a_texCoord;' +
  'varying vec2       v_texCoord;' +
  'varying vec4       v_clipPos;' +
  'uniform mat4       u_matrix;' +
  'uniform mat4       u_clipMatrix;' +
  'void main()' +
  '{' +
  '   gl_Position = u_matrix * a_position;' +
  '   v_clipPos = u_clipMatrix * a_position;' +
  '   v_texCoord = a_texCoord;' +
  '   v_texCoord.y = 1.0 - v_texCoord.y;' +
  '}';

//----- フラグメントシェーダプログラム -----
// Normal & Add & Mult 共通 （PremultipliedAlpha）
export const fragmentShaderSrcPremultipliedAlpha =
  'precision mediump float;' +
  'varying vec2       v_texCoord;' + //v2f.texcoord
  'uniform vec4       u_baseColor;' +
  'uniform sampler2D  s_texture0;' + //_MainTex
  'void main()' +
  '{' +
  '   gl_FragColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;' +
  '}';

// Normal （クリッピングされたものの描画用、PremultipliedAlpha兼用）
export const fragmentShaderSrcMaskPremultipliedAlpha =
  'precision mediump float;' +
  'varying vec2       v_texCoord;' +
  'varying vec4       v_clipPos;' +
  'uniform vec4       u_baseColor;' +
  'uniform vec4       u_channelFlag;' +
  'uniform sampler2D  s_texture0;' +
  'uniform sampler2D  s_texture1;' +
  'void main()' +
  '{' +
  '   vec4 col_formask = texture2D(s_texture0 , v_texCoord) * u_baseColor;' +
  '   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;' +
  '   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;' +
  '   col_formask = col_formask * maskVal;' +
  '   gl_FragColor = col_formask;' +
  '}';

// Normal & Add & Mult 共通（クリッピングされて反転使用の描画用、PremultipliedAlphaの場合）
export const fragmentShaderSrcMaskInvertedPremultipliedAlpha =
  'precision mediump float;' +
  'varying vec2 v_texCoord;' +
  'varying vec4 v_clipPos;' +
  'uniform sampler2D s_texture0;' +
  'uniform sampler2D s_texture1;' +
  'uniform vec4 u_channelFlag;' +
  'uniform vec4 u_baseColor;' +
  'void main()' +
  '{' +
  'vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;' +
  'vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;' +
  'float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;' +
  'col_formask = col_formask * (1.0 - maskVal);' +
  'gl_FragColor = col_formask;' +
  '}';

/**
 * WebGL用の描画命令を実装したクラス
 */
export class CubismRenderer_WebGL extends CubismRenderer {
  /**
   * レンダラの初期化処理を実行する
   * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
   *
   * @param model モデルのインスタンス
   */
  public initialize(model: CubismModel): void {
    if (model.isUsingMasking()) {
      this._clippingManager = new CubismClippingManager_WebGL(); // クリッピングマスク・バッファ前処理方式を初期化
      this._clippingManager.initialize(
        model,
        model.getDrawableCount(),
        model.getDrawableMasks(),
        model.getDrawableMaskCounts()
      );
    }

    this._sortedDrawableIndexList.resize(model.getDrawableCount(), 0);

    super.initialize(model); // 親クラスの処理を呼ぶ
  }

  /**
   * WebGLテクスチャのバインド処理
   * CubismRendererにテクスチャを設定し、CubismRenderer内でその画像を参照するためのIndex値を戻り値とする
   * @param modelTextureNo セットするモデルテクスチャの番号
   * @param glTextureNo WebGLテクスチャの番号
   */
  public bindTexture(modelTextureNo: number, glTexture: WebGLTexture): void {
    this._textures.setValue(modelTextureNo, glTexture);
  }

  /**
   * WebGLにバインドされたテクスチャのリストを取得する
   * @return テクスチャのリスト
   */
  public getBindedTextures(): csmMap<number, WebGLTexture> {
    return this._textures;
  }

  /**
   * クリッピングマスクバッファのサイズを設定する
   * マスク用のFrameBufferを破棄、再作成する為処理コストは高い
   * @param size クリッピングマスクバッファのサイズ
   */
  public setClippingMaskBufferSize(size: number) {
    // FrameBufferのサイズを変更するためにインスタンスを破棄・再作成する
    this._clippingManager.release();
    this._clippingManager = void 0;
    this._clippingManager = null;

    this._clippingManager = new CubismClippingManager_WebGL();

    this._clippingManager.setClippingMaskBufferSize(size);

    this._clippingManager.initialize(
      this.getModel(),
      this.getModel().getDrawableCount(),
      this.getModel().getDrawableMasks(),
      this.getModel().getDrawableMaskCounts()
    );
  }

  /**
   * クリッピングマスクバッファのサイズを取得する
   * @return クリッピングマスクバッファのサイズ
   */
  public getClippingMaskBufferSize(): number {
    return this._clippingManager.getClippingMaskBufferSize();
  }

  /**
   * コンストラクタ
   */
  public constructor() {
    super();
    this._clippingContextBufferForMask = null;
    this._clippingContextBufferForDraw = null;
    this._clippingManager = new CubismClippingManager_WebGL();
    this.firstDraw = true;
    this._textures = new csmMap<number, number>();
    this._sortedDrawableIndexList = new csmVector<number>();
    this._bufferData = {
      vertex: WebGLBuffer = null,
      uv: WebGLBuffer = null,
      index: WebGLBuffer = null
    };

    // テクスチャ対応マップの容量を確保しておく
    this._textures.prepareCapacity(32, true);
  }

  /**
   * デストラクタ相当の処理
   */
  public release(): void {
    this._clippingManager.release();
    this._clippingManager = void 0;
    this._clippingManager = null;

    this.gl.deleteBuffer(this._bufferData.vertex);
    this._bufferData.vertex = null;
    this.gl.deleteBuffer(this._bufferData.uv);
    this._bufferData.uv = null;
    this.gl.deleteBuffer(this._bufferData.index);
    this._bufferData.index = null;
    this._bufferData = null;

    this._textures = null;
  }

  /**
   * モデルを描画する実際の処理
   */
  public doDrawModel(): void {
    //------------ クリッピングマスク・バッファ前処理方式の場合 ------------
    if (this._clippingManager != null) {
      this.preDraw();
      this._clippingManager.setupClippingContext(this.getModel(), this);
    }

    // 上記クリッピング処理内でも一度PreDrawを呼ぶので注意!!
    this.preDraw();

    const drawableCount: number = this.getModel().getDrawableCount();
    const renderOrder: Int32Array = this.getModel().getDrawableRenderOrders();

    // インデックスを描画順でソート
    for (let i = 0; i < drawableCount; ++i) {
      const order: number = renderOrder[i];
      this._sortedDrawableIndexList.set(order, i);
    }

    // 描画
    for (let i = 0; i < drawableCount; ++i) {
      const drawableIndex: number = this._sortedDrawableIndexList.at(i);

      // Drawableが表示状態でなければ処理をパスする
      if (!this.getModel().getDrawableDynamicFlagIsVisible(drawableIndex)) {
        continue;
      }

      // クリッピングマスクをセットする
      this.setClippingContextBufferForDraw(
        this._clippingManager != null
          ? this._clippingManager
              .getClippingContextListForDraw()
              .at(drawableIndex)
          : null
      );

      this.setIsCulling(this.getModel().getDrawableCulling(drawableIndex));

      this.drawMesh(
        this.getModel().getDrawableTextureIndices(drawableIndex),
        this.getModel().getDrawableVertexIndexCount(drawableIndex),
        this.getModel().getDrawableVertexCount(drawableIndex),
        this.getModel().getDrawableVertexIndices(drawableIndex),
        this.getModel().getDrawableVertices(drawableIndex),
        this.getModel().getDrawableVertexUvs(drawableIndex),
        this.getModel().getDrawableOpacity(drawableIndex),
        this.getModel().getDrawableBlendMode(drawableIndex),
        this.getModel().getDrawableInvertedMaskBit(drawableIndex)
      );
    }
  }

  /**
   * [オーバーライド]
   * 描画オブジェクト（アートメッシュ）を描画する。
   * ポリゴンメッシュとテクスチャ番号をセットで渡す。
   * @param textureNo 描画するテクスチャ番号
   * @param indexCount 描画オブジェクトのインデックス値
   * @param vertexCount ポリゴンメッシュの頂点数
   * @param indexArray ポリゴンメッシュのインデックス配列
   * @param vertexArray ポリゴンメッシュの頂点配列
   * @param uvArray uv配列
   * @param opacity 不透明度
   * @param colorBlendMode カラー合成タイプ
   * @param invertedMask マスク使用時のマスクの反転使用
   */
  public drawMesh(
    textureNo: number,
    indexCount: number,
    vertexCount: number,
    indexArray: Uint16Array,
    vertexArray: Float32Array,
    uvArray: Float32Array,
    opacity: number,
    colorBlendMode: CubismBlendMode,
    invertedMask: boolean
  ): void {
    // 裏面描画の有効・無効
    if (this.isCulling()) {
      this.gl.enable(this.gl.CULL_FACE);
    } else {
      this.gl.disable(this.gl.CULL_FACE);
    }

    this.gl.frontFace(this.gl.CCW); // Cubism SDK OpenGLはマスク・アートメッシュ共にCCWが表面

    const modelColorRGBA: CubismTextureColor = this.getModelColor();

    if (this.getClippingContextBufferForMask() == null) {
      // マスク生成時以外
      modelColorRGBA.A *= opacity;
      if (this.isPremultipliedAlpha()) {
        modelColorRGBA.R *= modelColorRGBA.A;
        modelColorRGBA.G *= modelColorRGBA.A;
        modelColorRGBA.B *= modelColorRGBA.A;
      }
    }

    let drawtexture: WebGLTexture; // シェーダに渡すテクスチャ

    // テクスチャマップからバインド済みテクスチャＩＤを取得
    // バインドされていなければダミーのテクスチャIDをセットする
    if (this._textures.getValue(textureNo) != null) {
      drawtexture = this._textures.getValue(textureNo);
    } else {
      drawtexture = null;
    }

    CubismShader_WebGL.getInstance().setupShaderProgram(
      this,
      drawtexture,
      vertexCount,
      vertexArray,
      indexArray,
      uvArray,
      this._bufferData,
      opacity,
      colorBlendMode,
      modelColorRGBA,
      this.isPremultipliedAlpha(),
      this.getMvpMatrix(),
      invertedMask
    );

    // ポリゴンメッシュを描画する
    this.gl.drawElements(
      this.gl.TRIANGLES,
      indexCount,
      this.gl.UNSIGNED_SHORT,
      0
    );

    // 後処理
    this.gl.useProgram(null);
    this.setClippingContextBufferForDraw(null);
    this.setClippingContextBufferForMask(null);
  }

  /**
   * レンダラが保持する静的なリソースを解放する
   * WebGLの静的なシェーダープログラムを解放する
   */
  public static doStaticRelease(): void {
    CubismShader_WebGL.deleteInstance();
  }

  /**
   * レンダーステートを設定する
   * @param fbo アプリケーション側で指定しているフレームバッファ
   * @param viewport ビューポート
   */
  public setRenderState(fbo: WebGLFramebuffer, viewport: number[]): void {
    s_fbo = fbo;
    s_viewport = viewport;
  }

  /**
   * 描画開始時の追加処理
   * モデルを描画する前にクリッピングマスクに必要な処理を実装している
   */
  public preDraw(): void {
    if (this.firstDraw) {
      this.firstDraw = false;

      // 拡張機能を有効にする
      this._anisortopy =
        this.gl.getExtension('EXT_texture_filter_anisotropic') ||
        this.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
        this.gl.getExtension('MOZ_EXT_texture_filter_anisotropic');
    }

    this.gl.disable(this.gl.SCISSOR_TEST);
    this.gl.disable(this.gl.STENCIL_TEST);
    this.gl.disable(this.gl.DEPTH_TEST);

    // カリング（1.0beta3）
    this.gl.frontFace(this.gl.CW);

    this.gl.enable(this.gl.BLEND);
    this.gl.colorMask(true, true, true, true);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); // 前にバッファがバインドされていたら破棄する必要がある
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  }

  /**
   * マスクテクスチャに描画するクリッピングコンテキストをセットする
   */
  public setClippingContextBufferForMask(clip: CubismClippingContext) {
    this._clippingContextBufferForMask = clip;
  }

  /**
   * マスクテクスチャに描画するクリッピングコンテキストを取得する
   * @return マスクテクスチャに描画するクリッピングコンテキスト
   */
  public getClippingContextBufferForMask(): CubismClippingContext {
    return this._clippingContextBufferForMask;
  }

  /**
   * 画面上に描画するクリッピングコンテキストをセットする
   */
  public setClippingContextBufferForDraw(clip: CubismClippingContext): void {
    this._clippingContextBufferForDraw = clip;
  }

  /**
   * 画面上に描画するクリッピングコンテキストを取得する
   * @return 画面上に描画するクリッピングコンテキスト
   */
  public getClippingContextBufferForDraw(): CubismClippingContext {
    return this._clippingContextBufferForDraw;
  }

  /**
   * glの設定
   */
  public startUp(gl: WebGLRenderingContext): void {
    this.gl = gl;
    this._clippingManager.setGL(gl);
    CubismShader_WebGL.getInstance().setGl(gl);
  }

  _textures: csmMap<number, WebGLTexture>; // モデルが参照するテクスチャとレンダラでバインドしているテクスチャとのマップ
  _sortedDrawableIndexList: csmVector<number>; // 描画オブジェクトのインデックスを描画順に並べたリスト
  _clippingManager: CubismClippingManager_WebGL; // クリッピングマスク管理オブジェクト
  _clippingContextBufferForMask: CubismClippingContext; // マスクテクスチャに描画するためのクリッピングコンテキスト
  _clippingContextBufferForDraw: CubismClippingContext; // 画面上描画するためのクリッピングコンテキスト
  firstDraw: boolean;
  _bufferData: {
    vertex: WebGLBuffer;
    uv: WebGLBuffer;
    index: WebGLBuffer;
  }; // 頂点バッファデータ
  gl: WebGLRenderingContext; // webglコンテキスト
}

/**
 * レンダラが保持する静的なリソースを開放する
 */
CubismRenderer.staticRelease = (): void => {
  CubismRenderer_WebGL.doStaticRelease();
};

// Namespace definition for compatibility.
import * as $ from './cubismrenderer_webgl';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Live2DCubismFramework {
  export const CubismClippingContext = $.CubismClippingContext;
  export type CubismClippingContext = $.CubismClippingContext;
  export const CubismClippingManager_WebGL = $.CubismClippingManager_WebGL;
  export type CubismClippingManager_WebGL = $.CubismClippingManager_WebGL;
  export const CubismRenderTextureResource = $.CubismRenderTextureResource;
  export type CubismRenderTextureResource = $.CubismRenderTextureResource;
  export const CubismRenderer_WebGL = $.CubismRenderer_WebGL;
  export type CubismRenderer_WebGL = $.CubismRenderer_WebGL;
  export const CubismShaderSet = $.CubismShaderSet;
  export type CubismShaderSet = $.CubismShaderSet;
  export const CubismShader_WebGL = $.CubismShader_WebGL;
  export type CubismShader_WebGL = $.CubismShader_WebGL;
  export const ShaderNames = $.ShaderNames;
  export type ShaderNames = $.ShaderNames;
}
