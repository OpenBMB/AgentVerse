import CreateFolder from '../builders/CreateFolder.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddFolder = function (config) {
    var scene = this.scene;

    // Create folder
    var folderStyle = GetValue(this.styles, 'folder') || {};
    folderStyle.tweaker = this.styles;
    folderStyle.root = this.root;
    var folder = CreateFolder(scene, config, folderStyle);
    delete folderStyle.tweaker;
    delete folderStyle.root;


    // Add folder
    this.add(
        folder,
        { expand: true }
    );

    // Set content
    folder.setTitle(config);

    var expanded = GetValue(config, 'expanded', true);
    if (expanded) {
        folder.expand(0);
    } else {
        folder.collapse(0);
    }

    var childTweaker = folder.getElement('child');

    if (config.key) {
        this.root.addChildrenMap(config.key, childTweaker);
    }

    return childTweaker;
}

export default AddFolder;