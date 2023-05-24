import FolderTitle from '../gameobjects/label/FolderTitle.js';
import CreateTweaker from '../gameobjects/utils/CreateTweaker.js';
import CreateBackground from './CreateBackground.js';
import Folder from '../gameobjects/folder/Folder.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateFolder = function (scene, config, style) {
    // Create Folder-title
    var titleStyle = GetValue(style, 'title') || {};
    var title = new FolderTitle(scene, titleStyle);
    scene.add.existing(title);

    title
        .on('folder.expand', function () {
            title.setExpandedState(true);
        })
        .on('folder.collapse', function () {
            title.setExpandedState(false);
        })

    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker'),
        space: GetValue(style, 'space') || {}
    }
    var child = CreateTweaker(scene, tweakerConfig);

    var backgroundStyle = GetValue(style, 'background');
    var background = CreateBackground(scene, config, backgroundStyle);

    var folder = new Folder(scene, {
        orientation: 1,
        title: title,
        child: child,
        background: background,
        transition: {
            duration: GetValue(style, 'transition.duration', 200)
        },
    })
    scene.add.existing(folder);

    return folder;
}

export default CreateFolder;