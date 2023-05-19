import Label from '../label/Label.js';
import { FileChooser } from '../filechooser/FileChooser.js';
import FileChooserMethods from './FileChooserMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class FileSelectorButton extends Label {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexFileSelectorButton';

        var fileChooser = new FileChooser(scene);
        scene.add.existing(fileChooser);
        this.addBackground(fileChooser);

        this.addChildrenMap('fileChooser', fileChooser);

        this.setAccept(GetValue(config, 'accept', ''));
        this.setMultiple(GetValue(config, 'multiple', false));

        fileChooser
            .on('change', function (gameObject) {
                var files = gameObject.files;
                if (files.length === 0) {
                    return;
                }

                files = Array.from(files);
                this.emit('select', files, this);
            }, this)

    }

    get files() {
        return this.childrenMap.fileChooser.files;
    }

}

Object.assign(
    FileSelectorButton.prototype,
    FileChooserMethods,
)

export default FileSelectorButton;