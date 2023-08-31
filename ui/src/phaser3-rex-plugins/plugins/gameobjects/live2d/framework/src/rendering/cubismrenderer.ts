/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { CubismMatrix44 } from '../math/cubismmatrix44';
import { CubismModel } from '../model/cubismmodel';

/**
 * モデル描画を処理するレンダラ
 *
 * サブクラスに環境依存の描画命令を記述する。
 */
export abstract class CubismRenderer {
  /**
   * レンダラのインスタンスを生成して取得する
   *
   * @return レンダラのインスタンス
   */
  public static create(): CubismRenderer {
    return null;
  }

  /**
   * レンダラのインスタンスを解放する
   */
  public static delete(renderer: CubismRenderer): void {
    renderer = null;
  }

  /**
   * レンダラの初期化処理を実行する
   * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
   * @param model モデルのインスタンス
   */
  public initialize(model: CubismModel): void {
    this._model = model;
  }

  /**
   * モデルを描画する
   */
  public drawModel(): void {
    if (this.getModel() == null) return;

    this.doDrawModel();
  }

  /**
   * Model-View-Projection 行列をセットする
   * 配列は複製されるので、元の配列は外で破棄して良い
   * @param matrix44 Model-View-Projection 行列
   */
  public setMvpMatrix(matrix44: CubismMatrix44): void {
    this._mvpMatrix4x4.setMatrix(matrix44.getArray());
  }

  /**
   * Model-View-Projection 行列を取得する
   * @return Model-View-Projection 行列
   */
  public getMvpMatrix(): CubismMatrix44 {
    return this._mvpMatrix4x4;
  }

  /**
   * モデルの色をセットする
   * 各色0.0~1.0の間で指定する（1.0が標準の状態）
   * @param red 赤チャンネルの値
   * @param green 緑チャンネルの値
   * @param blue 青チャンネルの値
   * @param alpha αチャンネルの値
   */
  public setModelColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): void {
    if (red < 0.0) {
      red = 0.0;
    } else if (red > 1.0) {
      red = 1.0;
    }

    if (green < 0.0) {
      green = 0.0;
    } else if (green > 1.0) {
      green = 1.0;
    }

    if (blue < 0.0) {
      blue = 0.0;
    } else if (blue > 1.0) {
      blue = 1.0;
    }

    if (alpha < 0.0) {
      alpha = 0.0;
    } else if (alpha > 1.0) {
      alpha = 1.0;
    }

    this._modelColor.R = red;
    this._modelColor.G = green;
    this._modelColor.B = blue;
    this._modelColor.A = alpha;
  }

  /**
   * モデルの色を取得する
   * 各色0.0~1.0の間で指定する(1.0が標準の状態)
   *
   * @return RGBAのカラー情報
   */
  public getModelColor(): CubismTextureColor {
    return JSON.parse(JSON.stringify(this._modelColor));
  }

  /**
   * 乗算済みαの有効・無効をセットする
   * 有効にするならtrue、無効にするならfalseをセットする
   */
  public setIsPremultipliedAlpha(enable: boolean): void {
    this._isPremultipliedAlpha = enable;
  }

  /**
   * 乗算済みαの有効・無効を取得する
   * @return true 乗算済みのα有効
   * @return false 乗算済みのα無効
   */
  public isPremultipliedAlpha(): boolean {
    return this._isPremultipliedAlpha;
  }

  /**
   * カリング（片面描画）の有効・無効をセットする。
   * 有効にするならtrue、無効にするならfalseをセットする
   */
  public setIsCulling(culling: boolean): void {
    this._isCulling = culling;
  }

  /**
   * カリング（片面描画）の有効・無効を取得する。
   * @return true カリング有効
   * @return false カリング無効
   */
  public isCulling(): boolean {
    return this._isCulling;
  }

  /**
   * テクスチャの異方性フィルタリングのパラメータをセットする
   * パラメータ値の影響度はレンダラの実装に依存する
   * @param n パラメータの値
   */
  public setAnisotropy(n: number): void {
    this._anisortopy = n;
  }

  /**
   * テクスチャの異方性フィルタリングのパラメータをセットする
   * @return 異方性フィルタリングのパラメータ
   */
  public getAnisotropy(): number {
    return this._anisortopy;
  }

  /**
   * レンダリングするモデルを取得する
   * @return レンダリングするモデル
   */
  public getModel(): CubismModel {
    return this._model;
  }

  /**
   * コンストラクタ
   */
  protected constructor() {
    this._isCulling = false;
    this._isPremultipliedAlpha = false;
    this._anisortopy = 0.0;
    this._model = null;
    this._modelColor = new CubismTextureColor();

    // 単位行列に初期化
    this._mvpMatrix4x4 = new CubismMatrix44();
    this._mvpMatrix4x4.loadIdentity();
  }

  /**
   * モデル描画の実装
   */
  public abstract doDrawModel(): void;

  /**
   * 描画オブジェクト（アートメッシュ）を描画する
   * ポリゴンメッシュとテクスチャ番号をセットで渡す。
   * @param textureNo 描画するテクスチャ番号
   * @param indexCount 描画オブジェクトのインデックス値
   * @param vertexCount ポリゴンメッシュの頂点数
   * @param indexArray ポリゴンメッシュ頂点のインデックス配列
   * @param vertexArray ポリゴンメッシュの頂点配列
   * @param uvArray uv配列
   * @param opacity 不透明度
   * @param colorBlendMode カラーブレンディングのタイプ
   * @param invertedMask マスク使用時のマスクの反転使用
   */
  public abstract drawMesh(
    textureNo: number,
    indexCount: number,
    vertexCount: number,
    indexArray: Uint16Array,
    vertexArray: Float32Array,
    uvArray: Float32Array,
    opacity: number,
    colorBlendMode: CubismBlendMode,
    invertedMask: boolean
  ): void;

  /**
   * レンダラが保持する静的なリソースを開放する
   */
  public static staticRelease: Function;

  protected _mvpMatrix4x4: CubismMatrix44; // Model-View-Projection 行列
  protected _modelColor: CubismTextureColor; // モデル自体のカラー（RGBA）
  protected _isCulling: boolean; // カリングが有効ならtrue
  protected _isPremultipliedAlpha: boolean; // 乗算済みαならtrue
  protected _anisortopy: any; // テクスチャの異方性フィルタリングのパラメータ
  protected _model: CubismModel; // レンダリング対象のモデル
}

export enum CubismBlendMode {
  CubismBlendMode_Normal = 0, // 通常
  CubismBlendMode_Additive = 1, // 加算
  CubismBlendMode_Multiplicative = 2 // 乗算
}

/**
 * テクスチャの色をRGBAで扱うためのクラス
 */
export class CubismTextureColor {
  /**
   * コンストラクタ
   */
  constructor() {
    this.R = 1.0;
    this.G = 1.0;
    this.B = 1.0;
    this.A = 1.0;
  }

  R: number; // 赤チャンネル
  G: number; // 緑チャンネル
  B: number; // 青チャンネル
  A: number; // αチャンネル
}

// Namespace definition for compatibility.
import * as $ from './cubismrenderer';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Live2DCubismFramework {
  export const CubismBlendMode = $.CubismBlendMode;
  export type CubismBlendMode = $.CubismBlendMode;
  export const CubismRenderer = $.CubismRenderer;
  export type CubismRenderer = $.CubismRenderer;
  export const CubismTextureColor = $.CubismTextureColor;
  export type CubismTextureColor = $.CubismTextureColor;
}
