const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;

var GetLocalState = function (gameObject) {
    if (!gameObject.hasOwnProperty('rexContainer')) {
        var rexContainer = {
            parent: null, self: null, layer: null,
            x: 0, y: 0, syncPosition: true,
            rotation: 0, syncRotation: true,
            scaleX: 0, scaleY: 0, syncScale: true,
            alpha: 0, syncAlpha: true,
            visible: true,
            active: true,
        };

        Object.defineProperty(rexContainer, 'angle', {
            get: function () {
                return RadToDeg(this.rotation);
            },
            set: function (value) {
                this.rotation = DegToRad(value);
            }
        });
        Object.defineProperty(rexContainer, 'displayWidth', {
            get: function () {
                return gameObject.width * this.scaleX;
            },
            set: function (width) {
                this.scaleX = width / gameObject.width;
            }
        });
        Object.defineProperty(rexContainer, 'displayHeight', {
            get: function () {
                return gameObject.height * this.scaleY;
            },
            set: function (height) {
                this.scaleY = height / gameObject.height;
            }
        });

        gameObject.rexContainer = rexContainer;
    }
    return gameObject.rexContainer;
}

export default GetLocalState;