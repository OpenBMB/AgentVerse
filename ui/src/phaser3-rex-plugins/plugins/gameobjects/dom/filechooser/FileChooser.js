import Resize from '../utils/Resize.js';
import SyncTo from '../utils/SyncTo.js';
import LoadFileMethods from '../utils/LoadFileMethods.js';
import ClickPromose from './ClickPromise.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class FileChooser extends DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        }

        // Create a hidden file input
        var inputElement = document.createElement('input');
        inputElement.type = 'file';
        var inputStyle = inputElement.style;
        inputStyle.display = 'none';

        // Create a label parent
        var labelElement = document.createElement('label');
        labelElement.appendChild(inputElement);

        var style = GetValue(config, 'style', undefined);
        super(scene, x, y, labelElement, style);
        this.type = 'rexFileChooser';
        this.resetFromJSON(config);
        this.resize(width, height);

        // Register events
        var self = this;
        inputElement.onchange = function () {
            self.emit('change', self);
        }

        this.setCloseDelay(GetValue(config, 'closeDelay', 200));
        inputElement.onclick = function () {
            ClickPromose({
                game: scene,
                fileInput: inputElement,
                closeDelay: self.closeDelay
            })
                .then(function () {
                    self.emit('select', self);
                })
        }
    }

    resetFromJSON(config) {
        this.setAccept(GetValue(config, 'accept', ''));
        this.setMultiple(GetValue(config, 'multiple', false));
        return this;
    }

    setAccept(accept) {
        if (accept === undefined) {
            accept = '';
        }
        this.fileInput.setAttribute('accept', accept);
        return this;
    }

    setMultiple(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        if (enabled) {
            this.fileInput.setAttribute('multiple', '');
        } else {
            this.fileInput.removeAttribute('multiple');
        }
        return this;
    }

    setCloseDelay(delay) {
        if (delay === undefined) {
            delay = 200;
        }
        this.closeDelay = delay;
        return this;
    }

    get fileInput() {
        return this.node.children[0];
    }

    open() { // Only work under any touch event
        this.fileInput.click();
        return this;
    }

    get files() {
        return this.fileInput.files;
    }
}

var methods = {
    resize: Resize,
    syncTo: SyncTo,
}

Object.assign(
    FileChooser.prototype,
    methods,
    LoadFileMethods,
);

export default FileChooser;