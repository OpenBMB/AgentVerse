import Model from '../model/Model.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SetModel = function (key, config) {
    if (this.key === key) {
        return this;
    }

    var data = this.scene.cache.custom.live2d.get(key);
    if (!data || !data.model) {
        console.error(`Live2d: can't load ${key}'s assets`);
        return;
    }

    if (this.key !== undefined) {      // Change model
        this.model.release();          // Release old model        
        this.model = new Model(this);  // Create new model
    }

    this.key = key;
    this.model.setup(data);
    this.setSize(this.model._pixelWidth, this.model._pixelHeight);

    var autoPlayIdleMotion = GetValue(config, 'autoPlayIdleMotion', undefined);
    if (autoPlayIdleMotion !== undefined) {
        this.autoPlayIdleMotion(autoPlayIdleMotion);
    }

    return this;
}

export default SetModel;