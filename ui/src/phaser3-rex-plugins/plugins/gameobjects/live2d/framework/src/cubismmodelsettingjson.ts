/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { ICubismModelSetting } from './icubismmodelsetting';
import { CubismIdHandle } from './id/cubismid';
import { CubismFramework } from './live2dcubismframework';
import { csmMap, iterator } from './type/csmmap';
import { csmVector } from './type/csmvector';
import { CubismJson, Value } from './utils/cubismjson';

/**
 * Model3Jsonのキー文字列
 */

// JSON Keys
const Version = 'Version';
const FileReferences = 'FileReferences';
const Groups = 'Groups';
const Layout = 'Layout';
const HitAreas = 'HitAreas';

const Moc = 'Moc';
const Textures = 'Textures';
const Physics = 'Physics';
const Pose = 'Pose';
const Expressions = 'Expressions';
const Motions = 'Motions';

const UserData = 'UserData';
const Name = 'Name';
const FilePath = 'File';
const Id = 'Id';
const Ids = 'Ids';
const Target = 'Target';

// Motions
const Idle = 'Idle';
const TapBody = 'TapBody';
const PinchIn = 'PinchIn';
const PinchOut = 'PinchOut';
const Shake = 'Shake';
const FlickHead = 'FlickHead';
const Parameter = 'Parameter';

const SoundPath = 'Sound';
const FadeInTime = 'FadeInTime';
const FadeOutTime = 'FadeOutTime';

// Layout
const CenterX = 'CenterX';
const CenterY = 'CenterY';
const X = 'X';
const Y = 'Y';
const Width = 'Width';
const Height = 'Height';

const LipSync = 'LipSync';
const EyeBlink = 'EyeBlink';

const InitParameter = 'init_param';
const InitPartsVisible = 'init_parts_visible';
const Val = 'val';

enum FrequestNode {
  FrequestNode_Groups, // getRoot().getValueByString(Groups)
  FrequestNode_Moc, // getRoot().getValueByString(FileReferences).getValueByString(Moc)
  FrequestNode_Motions, // getRoot().getValueByString(FileReferences).getValueByString(Motions)
  FrequestNode_Expressions, // getRoot().getValueByString(FileReferences).getValueByString(Expressions)
  FrequestNode_Textures, // getRoot().getValueByString(FileReferences).getValueByString(Textures)
  FrequestNode_Physics, // getRoot().getValueByString(FileReferences).getValueByString(Physics)
  FrequestNode_Pose, // getRoot().getValueByString(FileReferences).getValueByString(Pose)
  FrequestNode_HitAreas // getRoot().getValueByString(HitAreas)
}

/**
 * Model3Jsonパーサー
 *
 * model3.jsonファイルをパースして値を取得する
 */
export class CubismModelSettingJson extends ICubismModelSetting {
  /**
   * 引数付きコンストラクタ
   *
   * @param buffer    Model3Jsonをバイト配列として読み込んだデータバッファ
   * @param size      Model3Jsonのデータサイズ
   */
  public constructor(buffer: ArrayBuffer, size: number) {
    super();
    this._json = CubismJson.create(buffer, size);

    if (this._json) {
      this._jsonValue = new csmVector<Value>();

      // 順番はenum FrequestNodeと一致させる
      this._jsonValue.pushBack(this._json.getRoot().getValueByString(Groups));
      this._jsonValue.pushBack(
        this._json
          .getRoot()
          .getValueByString(FileReferences)
          .getValueByString(Moc)
      );
      this._jsonValue.pushBack(
        this._json
          .getRoot()
          .getValueByString(FileReferences)
          .getValueByString(Motions)
      );
      this._jsonValue.pushBack(
        this._json
          .getRoot()
          .getValueByString(FileReferences)
          .getValueByString(Expressions)
      );
      this._jsonValue.pushBack(
        this._json
          .getRoot()
          .getValueByString(FileReferences)
          .getValueByString(Textures)
      );
      this._jsonValue.pushBack(
        this._json
          .getRoot()
          .getValueByString(FileReferences)
          .getValueByString(Physics)
      );
      this._jsonValue.pushBack(
        this._json
          .getRoot()
          .getValueByString(FileReferences)
          .getValueByString(Pose)
      );
      this._jsonValue.pushBack(this._json.getRoot().getValueByString(HitAreas));
    }
  }

  /**
   * デストラクタ相当の処理
   */
  public release(): void {
    CubismJson.delete(this._json);

    this._jsonValue = null;
  }

  /**
   * CubismJsonオブジェクトを取得する
   *
   * @return CubismJson
   */
  public GetJson(): CubismJson {
    return this._json;
  }

  /**
   * Mocファイルの名前を取得する
   * @return Mocファイルの名前
   */
  public getModelFileName(): string {
    if (!this.isExistModelFile()) {
      return '';
    }
    return this._jsonValue.at(FrequestNode.FrequestNode_Moc).getRawString();
  }

  /**
   * モデルが使用するテクスチャの数を取得する
   * テクスチャの数
   */
  public getTextureCount(): number {
    if (!this.isExistTextureFiles()) {
      return 0;
    }

    return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getSize();
  }

  /**
   * テクスチャが配置されたディレクトリの名前を取得する
   * @return テクスチャが配置されたディレクトリの名前
   */
  public getTextureDirectory(): string {
    return this._jsonValue
      .at(FrequestNode.FrequestNode_Textures)
      .getRawString();
  }

  /**
   * モデルが使用するテクスチャの名前を取得する
   * @param index 配列のインデックス値
   * @return テクスチャの名前
   */
  public getTextureFileName(index: number): string {
    return this._jsonValue
      .at(FrequestNode.FrequestNode_Textures)
      .getValueByIndex(index)
      .getRawString();
  }

  /**
   * モデルに設定された当たり判定の数を取得する
   * @return モデルに設定された当たり判定の数
   */
  public getHitAreasCount(): number {
    if (!this.isExistHitAreas()) {
      return 0;
    }

    return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getSize();
  }

  /**
   * 当たり判定に設定されたIDを取得する
   *
   * @param index 配列のindex
   * @return 当たり判定に設定されたID
   */
  public getHitAreaId(index: number): CubismIdHandle {
    return CubismFramework.getIdManager().getId(
      this._jsonValue
        .at(FrequestNode.FrequestNode_HitAreas)
        .getValueByIndex(index)
        .getValueByString(Id)
        .getRawString()
    );
  }

  /**
   * 当たり判定に設定された名前を取得する
   * @param index 配列のインデックス値
   * @return 当たり判定に設定された名前
   */
  public getHitAreaName(index: number): string {
    return this._jsonValue
      .at(FrequestNode.FrequestNode_HitAreas)
      .getValueByIndex(index)
      .getValueByString(Name)
      .getRawString();
  }

  /**
   * 物理演算設定ファイルの名前を取得する
   * @return 物理演算設定ファイルの名前
   */
  public getPhysicsFileName(): string {
    if (!this.isExistPhysicsFile()) {
      return '';
    }

    return this._jsonValue.at(FrequestNode.FrequestNode_Physics).getRawString();
  }

  /**
   * パーツ切り替え設定ファイルの名前を取得する
   * @return パーツ切り替え設定ファイルの名前
   */
  public getPoseFileName(): string {
    if (!this.isExistPoseFile()) {
      return '';
    }

    return this._jsonValue.at(FrequestNode.FrequestNode_Pose).getRawString();
  }

  /**
   * 表情設定ファイルの数を取得する
   * @return 表情設定ファイルの数
   */
  public getExpressionCount(): number {
    if (!this.isExistExpressionFile()) {
      return 0;
    }

    return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getSize();
  }

  /**
   * 表情設定ファイルを識別する名前（別名）を取得する
   * @param index 配列のインデックス値
   * @return 表情の名前
   */
  public getExpressionName(index: number): string {
    return this._jsonValue
      .at(FrequestNode.FrequestNode_Expressions)
      .getValueByIndex(index)
      .getValueByString(Name)
      .getRawString();
  }

  /**
   * 表情設定ファイルの名前を取得する
   * @param index 配列のインデックス値
   * @return 表情設定ファイルの名前
   */
  public getExpressionFileName(index: number): string {
    return this._jsonValue
      .at(FrequestNode.FrequestNode_Expressions)
      .getValueByIndex(index)
      .getValueByString(FilePath)
      .getRawString();
  }

  /**
   * モーショングループの数を取得する
   * @return モーショングループの数
   */
  public getMotionGroupCount(): number {
    if (!this.isExistMotionGroups()) {
      return 0;
    }

    return this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getKeys()
      .getSize();
  }

  /**
   * モーショングループの名前を取得する
   * @param index 配列のインデックス値
   * @return モーショングループの名前
   */
  public getMotionGroupName(index: number): string {
    if (!this.isExistMotionGroups()) {
      return null;
    }

    return this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getKeys()
      .at(index);
  }

  /**
   * モーショングループに含まれるモーションの数を取得する
   * @param groupName モーショングループの名前
   * @return モーショングループの数
   */
  public getMotionCount(groupName: string): number {
    if (!this.isExistMotionGroupName(groupName)) {
      return 0;
    }

    return this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getValueByString(groupName)
      .getSize();
  }

  /**
   * グループ名とインデックス値からモーションファイル名を取得する
   * @param groupName モーショングループの名前
   * @param index     配列のインデックス値
   * @return モーションファイルの名前
   */
  public getMotionFileName(groupName: string, index: number): string {
    if (!this.isExistMotionGroupName(groupName)) {
      return '';
    }

    return this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getValueByString(groupName)
      .getValueByIndex(index)
      .getValueByString(FilePath)
      .getRawString();
  }

  /**
   * モーションに対応するサウンドファイルの名前を取得する
   * @param groupName モーショングループの名前
   * @param index 配列のインデックス値
   * @return サウンドファイルの名前
   */
  public getMotionSoundFileName(groupName: string, index: number): string {
    if (!this.isExistMotionSoundFile(groupName, index)) {
      return '';
    }

    return this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getValueByString(groupName)
      .getValueByIndex(index)
      .getValueByString(SoundPath)
      .getRawString();
  }

  /**
   * モーション開始時のフェードイン処理時間を取得する
   * @param groupName モーショングループの名前
   * @param index 配列のインデックス値
   * @return フェードイン処理時間[秒]
   */
  public getMotionFadeInTimeValue(groupName: string, index: number): number {
    if (!this.isExistMotionFadeIn(groupName, index)) {
      return -1.0;
    }

    return this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getValueByString(groupName)
      .getValueByIndex(index)
      .getValueByString(FadeInTime)
      .toFloat();
  }

  /**
   * モーション終了時のフェードアウト処理時間を取得する
   * @param groupName モーショングループの名前
   * @param index 配列のインデックス値
   * @return フェードアウト処理時間[秒]
   */
  public getMotionFadeOutTimeValue(groupName: string, index: number): number {
    if (!this.isExistMotionFadeOut(groupName, index)) {
      return -1.0;
    }

    return this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getValueByString(groupName)
      .getValueByIndex(index)
      .getValueByString(FadeOutTime)
      .toFloat();
  }

  /**
   * ユーザーデータのファイル名を取得する
   * @return ユーザーデータのファイル名
   */
  public getUserDataFile(): string {
    if (!this.isExistUserDataFile()) {
      return '';
    }

    return this._json
      .getRoot()
      .getValueByString(FileReferences)
      .getValueByString(UserData)
      .getRawString();
  }

  /**
   * レイアウト情報を取得する
   * @param outLayoutMap csmMapクラスのインスタンス
   * @return true レイアウト情報が存在する
   * @return false レイアウト情報が存在しない
   */
  public getLayoutMap(outLayoutMap: csmMap<string, number>): boolean {
    // 存在しない要素にアクセスするとエラーになるためValueがnullの場合はnullを代入する
    const map: csmMap<string, Value> = this._json
      .getRoot()
      .getValueByString(Layout)
      .getMap();

    if (map == null) {
      return false;
    }

    let ret = false;

    for (
      const ite: iterator<string, Value> = map.begin();
      ite.notEqual(map.end());
      ite.preIncrement()
    ) {
      outLayoutMap.setValue(ite.ptr().first, ite.ptr().second.toFloat());
      ret = true;
    }

    return ret;
  }

  /**
   * 目パチに関連付けられたパラメータの数を取得する
   * @return 目パチに関連付けられたパラメータの数
   */
  public getEyeBlinkParameterCount(): number {
    if (!this.isExistEyeBlinkParameters()) {
      return 0;
    }

    let num = 0;
    for (
      let i = 0;
      i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize();
      i++
    ) {
      const refI: Value = this._jsonValue
        .at(FrequestNode.FrequestNode_Groups)
        .getValueByIndex(i);
      if (refI.isNull() || refI.isError()) {
        continue;
      }

      if (refI.getValueByString(Name).getRawString() == EyeBlink) {
        num = refI
          .getValueByString(Ids)
          .getVector()
          .getSize();
        break;
      }
    }

    return num;
  }

  /**
   * 目パチに関連付けられたパラメータのIDを取得する
   * @param index 配列のインデックス値
   * @return パラメータID
   */
  public getEyeBlinkParameterId(index: number): CubismIdHandle {
    if (!this.isExistEyeBlinkParameters()) {
      return null;
    }

    for (
      let i = 0;
      i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize();
      i++
    ) {
      const refI: Value = this._jsonValue
        .at(FrequestNode.FrequestNode_Groups)
        .getValueByIndex(i);
      if (refI.isNull() || refI.isError()) {
        continue;
      }

      if (refI.getValueByString(Name).getRawString() == EyeBlink) {
        return CubismFramework.getIdManager().getId(
          refI
            .getValueByString(Ids)
            .getValueByIndex(index)
            .getRawString()
        );
      }
    }
    return null;
  }

  /**
   * リップシンクに関連付けられたパラメータの数を取得する
   * @return リップシンクに関連付けられたパラメータの数
   */
  public getLipSyncParameterCount(): number {
    if (!this.isExistLipSyncParameters()) {
      return 0;
    }

    let num = 0;
    for (
      let i = 0;
      i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize();
      i++
    ) {
      const refI: Value = this._jsonValue
        .at(FrequestNode.FrequestNode_Groups)
        .getValueByIndex(i);
      if (refI.isNull() || refI.isError()) {
        continue;
      }

      if (refI.getValueByString(Name).getRawString() == LipSync) {
        num = refI
          .getValueByString(Ids)
          .getVector()
          .getSize();
        break;
      }
    }

    return num;
  }

  /**
   * リップシンクに関連付けられたパラメータの数を取得する
   * @param index 配列のインデックス値
   * @return パラメータID
   */
  public getLipSyncParameterId(index: number): CubismIdHandle {
    if (!this.isExistLipSyncParameters()) {
      return null;
    }

    for (
      let i = 0;
      i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize();
      i++
    ) {
      const refI: Value = this._jsonValue
        .at(FrequestNode.FrequestNode_Groups)
        .getValueByIndex(i);
      if (refI.isNull() || refI.isError()) {
        continue;
      }

      if (refI.getValueByString(Name).getRawString() == LipSync) {
        return CubismFramework.getIdManager().getId(
          refI
            .getValueByString(Ids)
            .getValueByIndex(index)
            .getRawString()
        );
      }
    }
    return null;
  }

  /**
   * モデルファイルのキーが存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistModelFile(): boolean {
    const node: Value = this._jsonValue.at(FrequestNode.FrequestNode_Moc);
    return !node.isNull() && !node.isError();
  }

  /**
   * テクスチャファイルのキーが存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistTextureFiles(): boolean {
    const node: Value = this._jsonValue.at(FrequestNode.FrequestNode_Textures);
    return !node.isNull() && !node.isError();
  }

  /**
   * 当たり判定のキーが存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistHitAreas(): boolean {
    const node: Value = this._jsonValue.at(FrequestNode.FrequestNode_HitAreas);
    return !node.isNull() && !node.isError();
  }

  /**
   * 物理演算ファイルのキーが存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistPhysicsFile(): boolean {
    const node: Value = this._jsonValue.at(FrequestNode.FrequestNode_Physics);
    return !node.isNull() && !node.isError();
  }

  /**
   * ポーズ設定ファイルのキーが存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistPoseFile(): boolean {
    const node: Value = this._jsonValue.at(FrequestNode.FrequestNode_Pose);
    return !node.isNull() && !node.isError();
  }

  /**
   * 表情設定ファイルのキーが存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistExpressionFile(): boolean {
    const node: Value = this._jsonValue.at(
      FrequestNode.FrequestNode_Expressions
    );
    return !node.isNull() && !node.isError();
  }

  /**
   * モーショングループのキーが存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistMotionGroups(): boolean {
    const node: Value = this._jsonValue.at(FrequestNode.FrequestNode_Motions);
    return !node.isNull() && !node.isError();
  }

  /**
   * 引数で指定したモーショングループのキーが存在するかどうかを確認する
   * @param groupName  グループ名
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistMotionGroupName(groupName: string): boolean {
    const node: Value = this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getValueByString(groupName);
    return !node.isNull() && !node.isError();
  }

  /**
   * 引数で指定したモーションに対応するサウンドファイルのキーが存在するかどうかを確認する
   * @param groupName  グループ名
   * @param index 配列のインデックス値
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistMotionSoundFile(groupName: string, index: number): boolean {
    const node: Value = this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getValueByString(groupName)
      .getValueByIndex(index)
      .getValueByString(SoundPath);
    return !node.isNull() && !node.isError();
  }

  /**
   * 引数で指定したモーションに対応するフェードイン時間のキーが存在するかどうかを確認する
   * @param groupName  グループ名
   * @param index 配列のインデックス値
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistMotionFadeIn(groupName: string, index: number): boolean {
    const node: Value = this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getValueByString(groupName)
      .getValueByIndex(index)
      .getValueByString(FadeInTime);
    return !node.isNull() && !node.isError();
  }

  /**
   * 引数で指定したモーションに対応するフェードアウト時間のキーが存在するかどうかを確認する
   * @param groupName  グループ名
   * @param index 配列のインデックス値
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistMotionFadeOut(groupName: string, index: number): boolean {
    const node: Value = this._jsonValue
      .at(FrequestNode.FrequestNode_Motions)
      .getValueByString(groupName)
      .getValueByIndex(index)
      .getValueByString(FadeOutTime);
    return !node.isNull() && !node.isError();
  }

  /**
   * UserDataのファイル名が存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistUserDataFile(): boolean {
    const node: Value = this._json
      .getRoot()
      .getValueByString(FileReferences)
      .getValueByString(UserData);
    return !node.isNull() && !node.isError();
  }

  /**
   * 目ぱちに対応付けられたパラメータが存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistEyeBlinkParameters(): boolean {
    if (
      this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() ||
      this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()
    ) {
      return false;
    }

    for (
      let i = 0;
      i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize();
      ++i
    ) {
      if (
        this._jsonValue
          .at(FrequestNode.FrequestNode_Groups)
          .getValueByIndex(i)
          .getValueByString(Name)
          .getRawString() == EyeBlink
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * リップシンクに対応付けられたパラメータが存在するかどうかを確認する
   * @return true キーが存在する
   * @return false キーが存在しない
   */
  private isExistLipSyncParameters(): boolean {
    if (
      this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() ||
      this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()
    ) {
      return false;
    }
    for (
      let i = 0;
      i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize();
      ++i
    ) {
      if (
        this._jsonValue
          .at(FrequestNode.FrequestNode_Groups)
          .getValueByIndex(i)
          .getValueByString(Name)
          .getRawString() == LipSync
      ) {
        return true;
      }
    }
    return false;
  }

  private _json: CubismJson;
  private _jsonValue: csmVector<Value>;
}

// Namespace definition for compatibility.
import * as $ from './cubismmodelsettingjson';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Live2DCubismFramework {
  export const CubismModelSettingJson = $.CubismModelSettingJson;
  export type CubismModelSettingJson = $.CubismModelSettingJson;
}
