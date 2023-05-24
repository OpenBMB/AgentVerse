import BBCodeText from './BBCodeText.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }

    // style Object = {
    //     font: [ 'font', '16px Courier' ],
    //     backgroundColor: [ 'backgroundColor', null ],
    //     backgroundColor2: [ 'backgroundColor2', null ],
    //     backgroundHorizontalGradient: ['backgroundHorizontalGradient', true],
    //     backgroundStrokeColor: ['backgroundStrokeColor', null],
    //     backgroundStrokeLineWidth: ['backgroundStrokeLineWidth', 2],
    //     backgroundCornerRadius: ['backgroundCornerRadius', 0],
    //     backgroundCornerIteration: ['backgroundCornerIteration', null],    
    //     fill: [ 'fill', '#fff' ],
    //     stroke: [ 'stroke', '#fff' ],
    //     strokeThickness: [ 'strokeThickness', 0 ],
    //     shadowOffsetX: [ 'shadow.offsetX', 0 ],
    //     shadowOffsetY: [ 'shadow.offsetY', 0 ],
    //     shadowColor: [ 'shadow.color', '#000' ],
    //     shadowBlur: [ 'shadow.blur', 0 ],
    //     shadowStroke: [ 'shadow.stroke', false ],
    //     shadowFill: [ 'shadow.fill', false ],
    //     align: [ 'align', 'left' ],
    //     maxLines: [ 'maxLines', 0 ],
    //     fixedWidth: [ 'fixedWidth', false ],
    //     fixedHeight: [ 'fixedHeight', false ]
    // }

    var content = GetAdvancedValue(config, 'text', '');
    var style = GetAdvancedValue(config, 'style', null);

    //  Padding
    //      { padding: 2 }
    //      { padding: { x: , y: }}
    //      { padding: { left: , top: }}
    //      { padding: { left: , right: , top: , bottom: }}  

    var padding = GetAdvancedValue(config, 'padding', null);

    if (padding !== null) {
        style.padding = padding;
    }

    var gameObject = new BBCodeText(this.scene, 0, 0, content, style);
    BuildGameObject(this.scene, gameObject, config);

    //  Text specific config options:

    gameObject.autoRound = GetAdvancedValue(config, 'autoRound', true);

    return gameObject;
};