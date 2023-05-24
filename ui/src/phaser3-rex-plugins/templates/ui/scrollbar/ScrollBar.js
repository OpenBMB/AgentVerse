import Sizer from '../sizer/Sizer.js';
import Slider from '../slider/Slider.js';
import InTouching from '../intouching/InTouching.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ScrollBar extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexScrollBar';

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var buttonsConfig = GetValue(config, 'buttons', undefined);
        var button0 = GetValue(buttonsConfig, 'top', GetValue(buttonsConfig, 'left', undefined));
        var button1 = GetValue(buttonsConfig, 'bottom', GetValue(buttonsConfig, 'right', undefined));

        var slider,
            sliderConfig = GetValue(config, 'slider', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (button0) {
            this.add(button0);

            var inTouching = new InTouching(button0);
            inTouching
                .on('intouch', function () {
                    if (!this.enable) {
                        return;
                    }
                    var step = (!slider.reverseAxis) ? -this.scrollStep : this.scrollStep;
                    this.value += step;
                }, this)
        }

        if (sliderConfig) {
            sliderConfig.orientation = this.orientation;
            sliderConfig.eventEmitter = this;
            sliderConfig.value = null;

            var proportion;
            if (this.orientation === 0) {
                var sliderWidth = GetValue(sliderConfig, 'width', undefined);
                proportion = (sliderWidth === undefined) ? 1 : 0;
            } else {
                var sliderHeight = GetValue(sliderConfig, 'height', undefined);
                proportion = (sliderHeight === undefined) ? 1 : 0;
            }

            slider = new Slider(scene, sliderConfig);
            scene.add.existing(slider);
            this.add(
                slider,
                {
                    proportion: proportion,
                }
            )
        }

        if (button1) {
            this.add(button1);

            var inTouching = new InTouching(button1);
            inTouching
                .on('intouch', function () {
                    if (!this.enable) {
                        return;
                    }
                    var step = (!slider.reverseAxis) ? this.scrollStep : -this.scrollStep;
                    this.value += step;
                }, this)
        }

        var buttons = [button0, button1];

        this.addChildrenMap('background', background);
        this.addChildrenMap('slider', slider);
        this.addChildrenMap('buttons', buttons);

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }
        this.setEnable(GetValue(config, 'enable', undefined));
        this.setValue(GetValue(config, 'value', 0));
        this.setScrollStep(GetValue(buttonsConfig, 'step', 0.01));
    }

    setScrollStep(value) {
        this.scrollStep = value;
        return this;
    }

    get enable() {
        if (this.childrenMap.slider) {
            return this.childrenMap.slider.enable;
        } else {
            return false;
        }
    }

    set enable(value) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.setEnable(value);
        }
    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    get value() {
        if (this.childrenMap.slider) {
            return this.childrenMap.slider.value;
        } else {
            return 0;
        }
    }

    set value(value) {
        if (!this.childrenMap.slider) {
            return;
        }
        this.childrenMap.slider.value = value;
    }

    setValue(value, min, max) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.setValue(value, min, max);
        }
        return this;
    }

    addValue(inc, min, max) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.addValue(inc, min, max);
        }
        return this;
    }

    getValue(min, max) {
        if (this.childrenMap.slider) {
            return this.childrenMap.slider.getValue(min, max);
        } else {
            return 0;
        }
    }

    easeValueTo(value, min, max) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.easeValueTo(value, min, max);
        }
        return this;
    }

    stopEaseValue() {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.stopEaseValue();
        }
        return this;
    }

    setEaseValueDuration(duration) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.setEaseValueDuration(duration);
        }
        return this;
    }

    setEaseValueFunction(ease) {
        if (this.childrenMap.slider) {
            this.childrenMap.slider.setEaseValueFunction(ease);
        }
        return this;
    }
}

export default ScrollBar;