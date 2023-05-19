import Sizer from '../../sizer/Sizer.js';

var CreatExpandContainer = function (scene, orientation) {
    var container = new Sizer(scene, {
        orientation: orientation
    })
    scene.add.existing(container);
    return container;
}

export default CreatExpandContainer;