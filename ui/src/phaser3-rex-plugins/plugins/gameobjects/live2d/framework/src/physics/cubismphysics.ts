/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { CubismMath } from '../math/cubismmath';
import { CubismVector2 } from '../math/cubismvector2';
import { CubismModel } from '../model/cubismmodel';
import {
  CubismPhysicsInput,
  CubismPhysicsNormalization,
  CubismPhysicsOutput,
  CubismPhysicsParticle,
  CubismPhysicsRig,
  CubismPhysicsSource,
  CubismPhysicsSubRig,
  CubismPhysicsTargetType
} from './cubismphysicsinternal';
import { CubismPhysicsJson } from './cubismphysicsjson';

// physics types tags.
const PhysicsTypeTagX = 'X';
const PhysicsTypeTagY = 'Y';
const PhysicsTypeTagAngle = 'Angle';

// Constant of air resistance.
const AirResistance = 5.0;

// Constant of maximum weight of input and output ratio.
const MaximumWeight = 100.0;

// Constant of threshold of movement.
const MovementThreshold = 0.001;

/**
 * 物理演算クラス
 */
export class CubismPhysics {
  /**
   * インスタンスの作成
   * @param buffer    physics3.jsonが読み込まれているバッファ
   * @param size      バッファのサイズ
   * @return 作成されたインスタンス
   */
  public static create(buffer: ArrayBuffer, size: number): CubismPhysics {
    const ret: CubismPhysics = new CubismPhysics();

    ret.parse(buffer, size);
    ret._physicsRig.gravity.y = 0;

    return ret;
  }

  /**
   * インスタンスを破棄する
   * @param physics 破棄するインスタンス
   */
  public static delete(physics: CubismPhysics): void {
    if (physics != null) {
      physics.release();
      physics = null;
    }
  }

  /**
   * 物理演算の評価
   * @param model 物理演算の結果を適用するモデル
   * @param deltaTimeSeconds デルタ時間[秒]
   */
  public evaluate(model: CubismModel, deltaTimeSeconds: number): void {
    let totalAngle: { angle: number };
    let weight: number;
    let radAngle: number;
    let outputValue: number;
    const totalTranslation: CubismVector2 = new CubismVector2();
    let currentSetting: CubismPhysicsSubRig;
    let currentInput: CubismPhysicsInput[];
    let currentOutput: CubismPhysicsOutput[];
    let currentParticles: CubismPhysicsParticle[];

    let parameterValue: Float32Array;
    let parameterMaximumValue: Float32Array;
    let parameterMinimumValue: Float32Array;
    let parameterDefaultValue: Float32Array;

    parameterValue = model.getModel().parameters.values;
    parameterMaximumValue = model.getModel().parameters.maximumValues;
    parameterMinimumValue = model.getModel().parameters.minimumValues;
    parameterDefaultValue = model.getModel().parameters.defaultValues;

    for (
      let settingIndex = 0;
      settingIndex < this._physicsRig.subRigCount;
      ++settingIndex
    ) {
      totalAngle = { angle: 0.0 };
      totalTranslation.x = 0.0;
      totalTranslation.y = 0.0;
      currentSetting = this._physicsRig.settings.at(settingIndex);
      currentInput = this._physicsRig.inputs.get(currentSetting.baseInputIndex);
      currentOutput = this._physicsRig.outputs.get(
        currentSetting.baseOutputIndex
      );
      currentParticles = this._physicsRig.particles.get(
        currentSetting.baseParticleIndex
      );

      // Load input parameters
      for (let i = 0; i < currentSetting.inputCount; ++i) {
        weight = currentInput[i].weight / MaximumWeight;

        if (currentInput[i].sourceParameterIndex == -1) {
          currentInput[i].sourceParameterIndex = model.getParameterIndex(
            currentInput[i].source.id
          );
        }

        currentInput[i].getNormalizedParameterValue(
          totalTranslation,
          totalAngle,
          parameterValue[currentInput[i].sourceParameterIndex],
          parameterMinimumValue[currentInput[i].sourceParameterIndex],
          parameterMaximumValue[currentInput[i].sourceParameterIndex],
          parameterDefaultValue[currentInput[i].sourceParameterIndex],
          currentSetting.normalizationPosition,
          currentSetting.normalizationAngle,
          currentInput[i].reflect,
          weight
        );
      }

      radAngle = CubismMath.degreesToRadian(-totalAngle.angle);

      totalTranslation.x =
        totalTranslation.x * CubismMath.cos(radAngle) -
        totalTranslation.y * CubismMath.sin(radAngle);
      totalTranslation.y =
        totalTranslation.x * CubismMath.sin(radAngle) +
        totalTranslation.y * CubismMath.cos(radAngle);

      // Calculate particles position.
      updateParticles(
        currentParticles,
        currentSetting.particleCount,
        totalTranslation,
        totalAngle.angle,
        this._options.wind,
        MovementThreshold * currentSetting.normalizationPosition.maximum,
        deltaTimeSeconds,
        AirResistance
      );

      // Update output parameters.
      for (let i = 0; i < currentSetting.outputCount; ++i) {
        const particleIndex = currentOutput[i].vertexIndex;

        if (
          particleIndex < 1 ||
          particleIndex >= currentSetting.particleCount
        ) {
          break;
        }

        if (currentOutput[i].destinationParameterIndex == -1) {
          currentOutput[i].destinationParameterIndex = model.getParameterIndex(
            currentOutput[i].destination.id
          );
        }

        const translation: CubismVector2 = new CubismVector2();
        translation.x =
          currentParticles[particleIndex].position.x -
          currentParticles[particleIndex - 1].position.x;
        translation.y =
          currentParticles[particleIndex].position.y -
          currentParticles[particleIndex - 1].position.y;

        outputValue = currentOutput[i].getValue(
          translation,
          currentParticles,
          particleIndex,
          currentOutput[i].reflect,
          this._options.gravity
        );

        const destinationParameterIndex: number =
          currentOutput[i].destinationParameterIndex;
        const outParameterValue: Float32Array =
          !Float32Array.prototype.slice && 'subarray' in Float32Array.prototype
            ? JSON.parse(
                JSON.stringify(
                  parameterValue.subarray(destinationParameterIndex)
                )
              ) // 値渡しするため、JSON.parse, JSON.stringify
            : parameterValue.slice(destinationParameterIndex);

        updateOutputParameterValue(
          outParameterValue,
          parameterMinimumValue[destinationParameterIndex],
          parameterMaximumValue[destinationParameterIndex],
          outputValue,
          currentOutput[i]
        );

        // 値を反映
        for (
          let offset: number = destinationParameterIndex, outParamIndex = 0;
          offset < parameterValue.length;
          offset++, outParamIndex++
        ) {
          parameterValue[offset] = outParameterValue[outParamIndex];
        }
      }
    }
  }

  /**
   * オプションの設定
   * @param options オプション
   */
  public setOptions(options: Options): void {
    this._options = options;
  }

  /**
   * オプションの取得
   * @return オプション
   */
  public getOption(): Options {
    return this._options;
  }

  /**
   * コンストラクタ
   */
  public constructor() {
    this._physicsRig = null;

    // set default options
    this._options = new Options();
    this._options.gravity.y = -1.0;
    this._options.gravity.x = 0;
    this._options.wind.x = 0;
    this._options.wind.y = 0;
  }

  /**
   * デストラクタ相当の処理
   */
  public release(): void {
    this._physicsRig = void 0;
    this._physicsRig = null;
  }

  /**
   * physics3.jsonをパースする。
   * @param physicsJson physics3.jsonが読み込まれているバッファ
   * @param size バッファのサイズ
   */
  public parse(physicsJson: ArrayBuffer, size: number): void {
    this._physicsRig = new CubismPhysicsRig();

    let json: CubismPhysicsJson = new CubismPhysicsJson(physicsJson, size);

    this._physicsRig.gravity = json.getGravity();
    this._physicsRig.wind = json.getWind();
    this._physicsRig.subRigCount = json.getSubRigCount();

    this._physicsRig.settings.updateSize(
      this._physicsRig.subRigCount,
      CubismPhysicsSubRig,
      true
    );
    this._physicsRig.inputs.updateSize(
      json.getTotalInputCount(),
      CubismPhysicsInput,
      true
    );
    this._physicsRig.outputs.updateSize(
      json.getTotalOutputCount(),
      CubismPhysicsOutput,
      true
    );
    this._physicsRig.particles.updateSize(
      json.getVertexCount(),
      CubismPhysicsParticle,
      true
    );

    let inputIndex = 0,
      outputIndex = 0,
      particleIndex = 0;

    for (let i = 0; i < this._physicsRig.settings.getSize(); ++i) {
      this._physicsRig.settings.at(
        i
      ).normalizationPosition.minimum = json.getNormalizationPositionMinimumValue(
        i
      );
      this._physicsRig.settings.at(
        i
      ).normalizationPosition.maximum = json.getNormalizationPositionMaximumValue(
        i
      );
      this._physicsRig.settings.at(
        i
      ).normalizationPosition.defalut = json.getNormalizationPositionDefaultValue(
        i
      );

      this._physicsRig.settings.at(
        i
      ).normalizationAngle.minimum = json.getNormalizationAngleMinimumValue(i);
      this._physicsRig.settings.at(
        i
      ).normalizationAngle.maximum = json.getNormalizationAngleMaximumValue(i);
      this._physicsRig.settings.at(
        i
      ).normalizationAngle.defalut = json.getNormalizationAngleDefaultValue(i);

      // Input
      this._physicsRig.settings.at(i).inputCount = json.getInputCount(i);
      this._physicsRig.settings.at(i).baseInputIndex = inputIndex;

      for (let j = 0; j < this._physicsRig.settings.at(i).inputCount; ++j) {
        this._physicsRig.inputs.at(inputIndex + j).sourceParameterIndex = -1;
        this._physicsRig.inputs.at(inputIndex + j).weight = json.getInputWeight(
          i,
          j
        );
        this._physicsRig.inputs.at(
          inputIndex + j
        ).reflect = json.getInputReflect(i, j);

        if (json.getInputType(i, j) == PhysicsTypeTagX) {
          this._physicsRig.inputs.at(inputIndex + j).type =
            CubismPhysicsSource.CubismPhysicsSource_X;
          this._physicsRig.inputs.at(
            inputIndex + j
          ).getNormalizedParameterValue = getInputTranslationXFromNormalizedParameterValue;
        } else if (json.getInputType(i, j) == PhysicsTypeTagY) {
          this._physicsRig.inputs.at(inputIndex + j).type =
            CubismPhysicsSource.CubismPhysicsSource_Y;
          this._physicsRig.inputs.at(
            inputIndex + j
          ).getNormalizedParameterValue = getInputTranslationYFromNormalizedParamterValue;
        } else if (json.getInputType(i, j) == PhysicsTypeTagAngle) {
          this._physicsRig.inputs.at(inputIndex + j).type =
            CubismPhysicsSource.CubismPhysicsSource_Angle;
          this._physicsRig.inputs.at(
            inputIndex + j
          ).getNormalizedParameterValue = getInputAngleFromNormalizedParameterValue;
        }

        this._physicsRig.inputs.at(inputIndex + j).source.targetType =
          CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
        this._physicsRig.inputs.at(
          inputIndex + j
        ).source.id = json.getInputSourceId(i, j);
      }
      inputIndex += this._physicsRig.settings.at(i).inputCount;

      // Output
      this._physicsRig.settings.at(i).outputCount = json.getOutputCount(i);
      this._physicsRig.settings.at(i).baseOutputIndex = outputIndex;

      for (let j = 0; j < this._physicsRig.settings.at(i).outputCount; ++j) {
        this._physicsRig.outputs.at(
          outputIndex + j
        ).destinationParameterIndex = -1;
        this._physicsRig.outputs.at(
          outputIndex + j
        ).vertexIndex = json.getOutputVertexIndex(i, j);
        this._physicsRig.outputs.at(
          outputIndex + j
        ).angleScale = json.getOutputAngleScale(i, j);
        this._physicsRig.outputs.at(
          outputIndex + j
        ).weight = json.getOutputWeight(i, j);
        this._physicsRig.outputs.at(outputIndex + j).destination.targetType =
          CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;

        this._physicsRig.outputs.at(
          outputIndex + j
        ).destination.id = json.getOutputDestinationId(i, j);

        if (json.getOutputType(i, j) == PhysicsTypeTagX) {
          this._physicsRig.outputs.at(outputIndex + j).type =
            CubismPhysicsSource.CubismPhysicsSource_X;
          this._physicsRig.outputs.at(
            outputIndex + j
          ).getValue = getOutputTranslationX;
          this._physicsRig.outputs.at(
            outputIndex + j
          ).getScale = getOutputScaleTranslationX;
        } else if (json.getOutputType(i, j) == PhysicsTypeTagY) {
          this._physicsRig.outputs.at(outputIndex + j).type =
            CubismPhysicsSource.CubismPhysicsSource_Y;
          this._physicsRig.outputs.at(
            outputIndex + j
          ).getValue = getOutputTranslationY;
          this._physicsRig.outputs.at(
            outputIndex + j
          ).getScale = getOutputScaleTranslationY;
        } else if (json.getOutputType(i, j) == PhysicsTypeTagAngle) {
          this._physicsRig.outputs.at(outputIndex + j).type =
            CubismPhysicsSource.CubismPhysicsSource_Angle;
          this._physicsRig.outputs.at(
            outputIndex + j
          ).getValue = getOutputAngle;
          this._physicsRig.outputs.at(
            outputIndex + j
          ).getScale = getOutputScaleAngle;
        }

        this._physicsRig.outputs.at(
          outputIndex + j
        ).reflect = json.getOutputReflect(i, j);
      }
      outputIndex += this._physicsRig.settings.at(i).outputCount;

      // Particle
      this._physicsRig.settings.at(i).particleCount = json.getParticleCount(i);
      this._physicsRig.settings.at(i).baseParticleIndex = particleIndex;

      for (let j = 0; j < this._physicsRig.settings.at(i).particleCount; ++j) {
        this._physicsRig.particles.at(
          particleIndex + j
        ).mobility = json.getParticleMobility(i, j);
        this._physicsRig.particles.at(
          particleIndex + j
        ).delay = json.getParticleDelay(i, j);
        this._physicsRig.particles.at(
          particleIndex + j
        ).acceleration = json.getParticleAcceleration(i, j);
        this._physicsRig.particles.at(
          particleIndex + j
        ).radius = json.getParticleRadius(i, j);
        this._physicsRig.particles.at(
          particleIndex + j
        ).position = json.getParticlePosition(i, j);
      }

      particleIndex += this._physicsRig.settings.at(i).particleCount;
    }

    this.initialize();

    json.release();
    json = void 0;
    json = null;
  }

  /**
   * 初期化する
   */
  public initialize(): void {
    let strand: CubismPhysicsParticle[];
    let currentSetting: CubismPhysicsSubRig;
    let radius: CubismVector2;

    for (
      let settingIndex = 0;
      settingIndex < this._physicsRig.subRigCount;
      ++settingIndex
    ) {
      currentSetting = this._physicsRig.settings.at(settingIndex);
      strand = this._physicsRig.particles.get(currentSetting.baseParticleIndex);

      // Initialize the top of particle.
      strand[0].initialPosition = new CubismVector2(0.0, 0.0);
      strand[0].lastPosition = new CubismVector2(
        strand[0].initialPosition.x,
        strand[0].initialPosition.y
      );
      strand[0].lastGravity = new CubismVector2(0.0, -1.0);
      strand[0].lastGravity.y *= -1.0;
      strand[0].velocity = new CubismVector2(0.0, 0.0);
      strand[0].force = new CubismVector2(0.0, 0.0);

      // Initialize paritcles.
      for (let i = 1; i < currentSetting.particleCount; ++i) {
        radius = new CubismVector2(0.0, 0.0);
        radius.y = strand[i].radius;
        strand[i].initialPosition = new CubismVector2(
          strand[i - 1].initialPosition.x + radius.x,
          strand[i - 1].initialPosition.y + radius.y
        );
        strand[i].position = new CubismVector2(
          strand[i].initialPosition.x,
          strand[i].initialPosition.y
        );
        strand[i].lastPosition = new CubismVector2(
          strand[i].initialPosition.x,
          strand[i].initialPosition.y
        );
        strand[i].lastGravity = new CubismVector2(0.0, -1.0);
        strand[i].lastGravity.y *= -1.0;
        strand[i].velocity = new CubismVector2(0.0, 0.0);
        strand[i].force = new CubismVector2(0.0, 0.0);
      }
    }
  }

  _physicsRig: CubismPhysicsRig; // 物理演算のデータ
  _options: Options; // オプション
}

/**
 * 物理演算のオプション
 */
export class Options {
  constructor() {
    this.gravity = new CubismVector2(0, 0);
    this.wind = new CubismVector2(0, 0);
  }

  gravity: CubismVector2; // 重力方向
  wind: CubismVector2; // 風の方向
}

/**
 * Gets sign.
 *
 * @param value Evaluation target value.
 *
 * @return Sign of value.
 */
function sign(value: number): number {
  let ret = 0;

  if (value > 0.0) {
    ret = 1;
  } else if (value < 0.0) {
    ret = -1;
  }

  return ret;
}

function getInputTranslationXFromNormalizedParameterValue(
  targetTranslation: CubismVector2,
  targetAngle: { angle: number },
  value: number,
  parameterMinimumValue: number,
  parameterMaximumValue: number,
  parameterDefaultValue: number,
  normalizationPosition: CubismPhysicsNormalization,
  normalizationAngle: CubismPhysicsNormalization,
  isInverted: boolean,
  weight: number
): void {
  targetTranslation.x +=
    normalizeParameterValue(
      value,
      parameterMinimumValue,
      parameterMaximumValue,
      parameterDefaultValue,
      normalizationPosition.minimum,
      normalizationPosition.maximum,
      normalizationPosition.defalut,
      isInverted
    ) * weight;
}

function getInputTranslationYFromNormalizedParamterValue(
  targetTranslation: CubismVector2,
  targetAngle: { angle: number },
  value: number,
  parameterMinimumValue: number,
  parameterMaximumValue: number,
  parameterDefaultValue: number,
  normalizationPosition: CubismPhysicsNormalization,
  normalizationAngle: CubismPhysicsNormalization,
  isInverted: boolean,
  weight: number
): void {
  targetTranslation.y +=
    normalizeParameterValue(
      value,
      parameterMinimumValue,
      parameterMaximumValue,
      parameterDefaultValue,
      normalizationPosition.minimum,
      normalizationPosition.maximum,
      normalizationPosition.defalut,
      isInverted
    ) * weight;
}

function getInputAngleFromNormalizedParameterValue(
  targetTranslation: CubismVector2,
  targetAngle: { angle: number },
  value: number,
  parameterMinimumValue: number,
  parameterMaximumValue: number,
  parameterDefaultValue: number,
  normalizaitionPosition: CubismPhysicsNormalization,
  normalizationAngle: CubismPhysicsNormalization,
  isInverted: boolean,
  weight: number
): void {
  targetAngle.angle +=
    normalizeParameterValue(
      value,
      parameterMinimumValue,
      parameterMaximumValue,
      parameterDefaultValue,
      normalizationAngle.minimum,
      normalizationAngle.maximum,
      normalizationAngle.defalut,
      isInverted
    ) * weight;
}

function getOutputTranslationX(
  translation: CubismVector2,
  particles: CubismPhysicsParticle[],
  particleIndex: number,
  isInverted: boolean,
  parentGravity: CubismVector2
): number {
  let outputValue: number = translation.x;

  if (isInverted) {
    outputValue *= -1.0;
  }

  return outputValue;
}

function getOutputTranslationY(
  translation: CubismVector2,
  particles: CubismPhysicsParticle[],
  particleIndex: number,
  isInverted: boolean,
  parentGravity: CubismVector2
): number {
  let outputValue: number = translation.y;

  if (isInverted) {
    outputValue *= -1.0;
  }
  return outputValue;
}

function getOutputAngle(
  translation: CubismVector2,
  particles: CubismPhysicsParticle[],
  particleIndex: number,
  isInverted: boolean,
  parentGravity: CubismVector2
): number {
  let outputValue: number;

  if (particleIndex >= 2) {
    parentGravity = particles[particleIndex - 1].position.substract(
      particles[particleIndex - 2].position
    );
  } else {
    parentGravity = parentGravity.multiplyByScaler(-1.0);
  }

  outputValue = CubismMath.directionToRadian(parentGravity, translation);

  if (isInverted) {
    outputValue *= -1.0;
  }

  return outputValue;
}

function getRangeValue(min: number, max: number): number {
  const maxValue: number = CubismMath.max(min, max);
  const minValue: number = CubismMath.min(min, max);

  return CubismMath.abs(maxValue - minValue);
}

function getDefaultValue(min: number, max: number): number {
  const minValue: number = CubismMath.min(min, max);
  return minValue + getRangeValue(min, max) / 2.0;
}

function getOutputScaleTranslationX(
  translationScale: CubismVector2,
  angleScale: number
): number {
  return JSON.parse(JSON.stringify(translationScale.x));
}

function getOutputScaleTranslationY(
  translationScale: CubismVector2,
  angleScale: number
): number {
  return JSON.parse(JSON.stringify(translationScale.y));
}

function getOutputScaleAngle(
  translationScale: CubismVector2,
  angleScale: number
): number {
  return JSON.parse(JSON.stringify(angleScale));
}

/**
 * Updates particles.
 *
 * @param strand                Target array of particle.
 * @param strandCount           Count of particle.
 * @param totalTranslation      Total translation value.
 * @param totalAngle            Total angle.
 * @param windDirection         Direction of Wind.
 * @param thresholdValue        Threshold of movement.
 * @param deltaTimeSeconds      Delta time.
 * @param airResistance         Air resistance.
 */
function updateParticles(
  strand: CubismPhysicsParticle[],
  strandCount: number,
  totalTranslation: CubismVector2,
  totalAngle: number,
  windDirection: CubismVector2,
  thresholdValue: number,
  deltaTimeSeconds: number,
  airResistance: number
) {
  let totalRadian: number;
  let delay: number;
  let radian: number;
  let currentGravity: CubismVector2;
  let direction: CubismVector2 = new CubismVector2(0.0, 0.0);
  let velocity: CubismVector2 = new CubismVector2(0.0, 0.0);
  let force: CubismVector2 = new CubismVector2(0.0, 0.0);
  let newDirection: CubismVector2 = new CubismVector2(0.0, 0.0);

  strand[0].position = new CubismVector2(
    totalTranslation.x,
    totalTranslation.y
  );

  totalRadian = CubismMath.degreesToRadian(totalAngle);
  currentGravity = CubismMath.radianToDirection(totalRadian);
  currentGravity.normalize();

  for (let i = 1; i < strandCount; ++i) {
    strand[i].force = currentGravity
      .multiplyByScaler(strand[i].acceleration)
      .add(windDirection);

    strand[i].lastPosition = new CubismVector2(
      strand[i].position.x,
      strand[i].position.y
    );

    delay = strand[i].delay * deltaTimeSeconds * 30.0;

    direction = strand[i].position.substract(strand[i - 1].position);

    radian =
      CubismMath.directionToRadian(strand[i].lastGravity, currentGravity) /
      airResistance;

    direction.x =
      CubismMath.cos(radian) * direction.x -
      direction.y * CubismMath.sin(radian);
    direction.y =
      CubismMath.sin(radian) * direction.x +
      direction.y * CubismMath.cos(radian);

    strand[i].position = strand[i - 1].position.add(direction);

    velocity = strand[i].velocity.multiplyByScaler(delay);
    force = strand[i].force.multiplyByScaler(delay).multiplyByScaler(delay);

    strand[i].position = strand[i].position.add(velocity).add(force);

    newDirection = strand[i].position.substract(strand[i - 1].position);
    newDirection.normalize();

    strand[i].position = strand[i - 1].position.add(
      newDirection.multiplyByScaler(strand[i].radius)
    );

    if (CubismMath.abs(strand[i].position.x) < thresholdValue) {
      strand[i].position.x = 0.0;
    }

    if (delay != 0.0) {
      strand[i].velocity = strand[i].position.substract(strand[i].lastPosition);
      strand[i].velocity = strand[i].velocity.divisionByScalar(delay);
      strand[i].velocity = strand[i].velocity.multiplyByScaler(
        strand[i].mobility
      );
    }

    strand[i].force = new CubismVector2(0.0, 0.0);
    strand[i].lastGravity = new CubismVector2(
      currentGravity.x,
      currentGravity.y
    );
  }
}

/**
 * Updates output parameter value.
 * @param parameterValue            Target parameter value.
 * @param parameterValueMinimum     Minimum of parameter value.
 * @param parameterValueMaximum     Maximum of parameter value.
 * @param translation               Translation value.
 */
function updateOutputParameterValue(
  parameterValue: Float32Array,
  parameterValueMinimum: number,
  parameterValueMaximum: number,
  translation: number,
  output: CubismPhysicsOutput
): void {
  let outputScale: number;
  let value: number;
  let weight: number;

  outputScale = output.getScale(output.translationScale, output.angleScale);

  value = translation * outputScale;

  if (value < parameterValueMinimum) {
    if (value < output.valueBelowMinimum) {
      output.valueBelowMinimum = value;
    }

    value = parameterValueMinimum;
  } else if (value > parameterValueMaximum) {
    if (value > output.valueExceededMaximum) {
      output.valueExceededMaximum = value;
    }

    value = parameterValueMaximum;
  }

  weight = output.weight / MaximumWeight;

  if (weight >= 1.0) {
    parameterValue[0] = value;
  } else {
    value = parameterValue[0] * (1.0 - weight) + value * weight;
    parameterValue[0] = value;
  }
}

function normalizeParameterValue(
  value: number,
  parameterMinimum: number,
  parameterMaximum: number,
  parameterDefault: number,
  normalizedMinimum: number,
  normalizedMaximum: number,
  normalizedDefault: number,
  isInverted: boolean
) {
  let result = 0.0;

  const maxValue: number = CubismMath.max(parameterMaximum, parameterMinimum);

  if (maxValue < value) {
    value = maxValue;
  }

  const minValue: number = CubismMath.min(parameterMaximum, parameterMinimum);

  if (minValue > value) {
    value = minValue;
  }

  const minNormValue: number = CubismMath.min(
    normalizedMinimum,
    normalizedMaximum
  );
  const maxNormValue: number = CubismMath.max(
    normalizedMinimum,
    normalizedMaximum
  );
  const middleNormValue: number = normalizedDefault;

  const middleValue: number = getDefaultValue(minValue, maxValue);
  const paramValue: number = value - middleValue;

  switch (sign(paramValue)) {
    case 1: {
      const nLength: number = maxNormValue - middleNormValue;
      const pLength: number = maxValue - middleValue;

      if (pLength != 0.0) {
        result = paramValue * (nLength / pLength);
        result += middleNormValue;
      }

      break;
    }
    case -1: {
      const nLength: number = minNormValue - middleNormValue;
      const pLength: number = minValue - middleValue;

      if (pLength != 0.0) {
        result = paramValue * (nLength / pLength);
        result += middleNormValue;
      }

      break;
    }
    case 0: {
      result = middleNormValue;

      break;
    }
    default: {
      break;
    }
  }

  return isInverted ? result : result * -1.0;
}

// Namespace definition for compatibility.
import * as $ from './cubismphysics';
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Live2DCubismFramework {
  export const CubismPhysics = $.CubismPhysics;
  export type CubismPhysics = $.CubismPhysics;
  export const Options = $.Options;
  export type Options = $.Options;
}
