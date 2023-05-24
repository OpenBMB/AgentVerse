# Live2d

## Load assets

1. Load setting (index) file. In `LAppModel.loadAssets`
    ```ts
    fetch(`${modelHomePath}${jsonFileName}`)
    ```
    - `modelHomePath` : `\Samples\Resources\Haru\`
    - `jsonFileName` : `Haru.model3.json`
1. Load CubismModel
    ```ts
    fetch(`${modelHomePath}${modelFileName}`);
    ```
    - `modelFileName` : `modelSetting.getModelFileName()`
    - Result : 
        ```ts
        CubismUserModel.loadModel(arrayBuffer)
        ```
1. Load CubismExpression
    ```ts
    const count: number = modelSetting.getExpressionCount();
    for (let i = 0; i < count; i++) {
        const expressionFileName = modelSetting.getExpressionFileName(i);
        fetch(`${modelHomePath}${expressionFileName}`);
    }
    ```
    - Result : 
        ```ts
        const motion: ACubismMotion = this.loadExpression(
            arrayBuffer,
            arrayBuffer.byteLength,
            expressionName
        );
        // More : update expressions
        ```
1. Load CubismPhysics
    ```ts
    fetch(`${modelHomePath}${physicsFileName}`);
    ```
    - `physicsFileName` : `modelSetting.getPhysicsFileName()`
    - Result : 
        ```ts
        CubismUserModel.loadPhysics(arrayBuffer)
        ```
1. Load CubismPose
    ```ts
    fetch(`${modelHomePath}${poseFileName}`);
    ```
    - `poseFileName` : `modelSetting.getPoseFileName()`
    - Result : 
        ```ts
        CubismUserModel.loadPose(arrayBuffer)
        ```
1. Setup EyeBlink
1. Setup Breath
1. Load UserData
    ```ts
    fetch(`${modelHomePath}${userDataFileName}`);
    ```
    - `userDataFileName` : `modelSetting.getUserDataFile()`
    - Result : 
        ```ts
        CubismUserModel.loadUserData(arrayBuffer)
        ```
1. Setup EyeBlinkIds
1. Setup LipSyncIds
1. Setup Layout
1. Load CubismMotion
    ```ts    
    const motionGroupCount: number = this._modelSetting.getMotionGroupCount();
    const group: string[] = [];
    for (let i = 0; i < motionGroupCount; i++) {
         group[i] = modelSetting.getMotionGroupName(i);
        fetch(`${modelHomePath}${expressionFileName}`);
    }
    ```
    - Result : 
        ```ts
        const motion: ACubismMotion = this.loadExpression(
            arrayBuffer,
            arrayBuffer.byteLength,
            expressionName
        );
        // More : update expressions
        ```
1. Load texture
    ```ts
    const textureCount: number = this._modelSetting.getTextureCount();
    for (
        let modelTextureNumber = 0;
        modelTextureNumber < textureCount;
        modelTextureNumber++
      ) {
        if (this._modelSetting.getTextureFileName(modelTextureNumber) == '') {
          console.log('getTextureFileName null');
          continue;
        }

        let texturePath =
          this._modelSetting.getTextureFileName(modelTextureNumber);
        texturePath = this._modelHomeDir + texturePath;
        
    }
    ```

## Update

1. `LAppDelegate.run()`
1. `LAppPal.updateTime()`
1. `LAppView.render()`
1. `LAppLive2DManager.onUpdate()`
1. `LAppModel.update()`
    ```ts
    this._model.loadParameters(); // 前回セーブされた状態をロード
    if (this._motionManager.isFinished()) {
      // モーションの再生がない場合、待機モーションの中からランダムで再生する
      this.startRandomMotion(
        LAppDefine.MotionGroupIdle,
        LAppDefine.PriorityIdle
      );
    } else {
      motionUpdated = this._motionManager.updateMotion(
        this._model,
        deltaTimeSeconds
      ); // モーションを更新
    }
    this._model.saveParameters(); // 状態を保存
    ```    

### Dragging interactive

```ts
    // ドラッグによる変化
    // ドラッグによる顔の向きの調整
    this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30); // -30から30の値を加える
    this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30);
    this._model.addParameterValueById(
      this._idParamAngleZ,
      this._dragX * this._dragY * -30
    );

    // ドラッグによる体の向きの調整
    this._model.addParameterValueById(
      this._idParamBodyAngleX,
      this._dragX * 10
    ); // -10から10の値を加える

    // ドラッグによる目の向きの調整
    this._model.addParameterValueById(this._idParamEyeBallX, this._dragX); // -1から1の値を加える
    this._model.addParameterValueById(this._idParamEyeBallY, this._dragY);

```

### Lip sync

## Render

1. `LAppLive2DManager.onUpdate()`
    - `projection` matrix :
        ```ts
        const projection: CubismMatrix44 = new CubismMatrix44();
        if(width < height) {
            projection.scale(1.0, width / height);
        } else {
            projection.scale(height / width, 1.0);
        }

        if (this._viewMatrix != null) {
          projection.multiplyByMatrix(this._viewMatrix);
        }
        ```
    - `_viewMatrix` matrix :
        - In LAppView
        - Copy to LAppLive2DManager
            ```ts
            live2DManager.setViewMatrix(this._viewMatrix)
            ```
            ```ts
            this._viewMatrix = new CubismMatrix44();
            
            public setViewMatrix(m: CubismMatrix44) {
                for (let i = 0; i < 16; i++) {
                    this._viewMatrix.getArray()[i] = m.getArray()[i];
                }
            }
            ```
1. `LAppModel.draw(projection)`
    ```ts
    projection.multiplyByMatrix(this._modelMatrix);
    this.getRenderer().setMvpMatrix(projection);
    this.doDraw();
    ```
    - `_modelMatrix` : Member of LAppModel/CubismUserModel

### CubismMatrix44

- `matrix.loadIdentity()` : Reset
- `matrix.setMatrix(tr)` : Copy from
- `var arr = matrix.getArray()` : 1d array of 16 units
- Translate
    - `var translateX = matrix.getTranslateX()` : TranslateX, `tr[12]`
    - `var translateY = matrix.getTranslateY()` : TranslateX, `tr[13]`
    - `matrix.translate(x, y)`
    - `matrix.translateX(x)`
    - `matrix.translateY(y)`
    - `matrix.translateRelative(x, y)`
- Scale
    - `var scaleX = matrix.getScaleX()` : ScaleX, `tr[0]`
    - `var scaleY = matrix.getScaleY()` : ScaleY, `tr[5]`
    - `matrix.scale(scaleX, scaleY)`
    - `matrix.scaleRelative(scaleX, scaleY)`
- Transform
    - `var positionX = matrix.transformX(localX)`
    - `var positionY = matrix.transformY(localY)`
    - `var localX = matrix.invertTransformX(positionX)`
    - `var localY = matrix.invertTransformY(positionY)`
- Multiply
    - `matrix.multiply(a, b, dst)`
    - `matrix.multiplyByMatrix(m)`
- Rotate
    - See [this article](https://learnopengl.com/Getting-started/Transformations), **Rotation** section.
- `matrix.clone()`

### Model display matrix

- Get model display matrix
    ```ts
    var modelMatrix = model.getModelMatrix()
    ```
- Change size = set scale
    ```ts
    modelMatrix.setWidth(width);
    modelMatrix.setHeight(width);
    ```
- Set position
    ```ts
    modelMatrix.setPosition(x, y);
    modelMatrix.setX(x);
    modelMatrix.setY(y);
    modelMatrix.setCenterPosition(x, y);
    modelMatrix.top(y);     // = setY
    modelMatrix.bottom(y);
    modelMatrix.left(y);    // = setX
    modelMatrix.right(y);
    modelMatrix.centerX(y);
    modelMatrix.centerY(y);
    ```

#### Compare

##### Init

- SDK
    ```javascript
    this._modelMatrix = new CubismModelMatrix(
      this._model.getCanvasWidth(),
      this._model.getCanvasHeight()
    );
    ```
    ```javascript
    this._modelSetting.getLayoutMap(layout);
    this._modelMatrix.setupFromLayout(layout);    
    ```
- Pixi-live2d-display
    ```javascript
    protected getLayout(): CommonLayout {
        // un-capitalize each key to satisfy the common layout format
        // e.g. CenterX -> centerX
        return mapKeys({ ...this.settings.layout }, (_, key) => key.charAt(0).toLowerCase() + key.slice(1));
    }
    ```
    ```javascript
    const layout = Object.assign(
        {
            width: 2,
            height: 2,
        },
        this.getLayout(),
    );

    this.localTransform.scale(layout.width / 2, layout.height / 2);
    // this calculation differs from Live2D SDK...
    const offsetX = (layout.x !== undefined && layout.x - layout.width / 2)
        || (layout.centerX !== undefined && layout.centerX)
        || (layout.left !== undefined && layout.left - layout.width / 2)
        || (layout.right !== undefined && layout.right + layout.width / 2)
        || 0;
    const offsetY = (layout.y !== undefined && layout.y - layout.height / 2)
        || (layout.centerY !== undefined && layout.centerY)
        || (layout.top !== undefined && layout.top - layout.height / 2)
        || (layout.bottom !== undefined && layout.bottom + layout.height / 2)
        || 0;
    this.localTransform.translate(this.width * offsetX, -this.height * offsetY);
    ```
    ```javascript
    (this as Mutable<this>).pixelsPerUnit = this.coreModel.getModel().canvasinfo.PixelsPerUnit;
    // move the origin from top left to center
    this.centeringTransform
        .scale(this.pixelsPerUnit, this.pixelsPerUnit)
        .translate(this.originalWidth / 2, this.originalHeight / 2);
    ```



## Hit test

```ts
const x: number = this._deviceToScreen.transformX(
  this._touchManager.getX()
); // 論理座標変換した座標を取得。
const y: number = this._deviceToScreen.transformY(
  this._touchManager.getY()
); // 論理座標変化した座標を取得。
```

```ts
const { width, height } = canvas;
const ratio: number = width / height;
const left: number = -ratio;
const right: number = ratio;
const bottom: number = LAppDefine.ViewLogicalLeft;
const top: number = LAppDefine.ViewLogicalRight;
```

```ts
this._deviceToScreen.loadIdentity();
if (width > height) {
  const screenW: number = Math.abs(right - left);
  this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
} else {
  const screenH: number = Math.abs(top - bottom);
  this._deviceToScreen.scaleRelative(screenH / height, -screenH / height);
}
this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);
```

```ts
hitTest(hitAreaName, x, y)
```

- `hitAreaName` : `'Head'`, `'Body'`

```ts
for (let i = 0; i < count; i++) {
  if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
    const drawId: CubismIdHandle = this._modelSetting.getHitAreaId(i);
    return this.isHit(drawId, x, y);
  }
}
```

```ts
CubismUserModel.isHit(drawableId,pointX,pointY);
```

```ts
this._modelMatrix = new CubismModelMatrix(
  this._model.getCanvasWidth(),
  this._model.getCanvasHeight()
);
```

```ts
public getCanvasWidth(): number {
  if (this._model == null) {
    return 0.0;
  }
  return (
    this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit
  );
}
```

```ts
public getCanvasHeight(): number {
  if (this._model == null) {
    return 0.0;
  }
  return (
    this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit
  );
}
```


