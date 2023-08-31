import TweakerShell from '../../TweakerShell';

var CreateTweaker = function (scene, config) {
    var tweaker = new TweakerShell(scene, config);
    scene.add.existing(tweaker);
    return tweaker;
}

export default CreateTweaker;