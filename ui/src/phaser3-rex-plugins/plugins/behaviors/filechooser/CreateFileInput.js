const GetValue = Phaser.Utils.Objects.GetValue;

var CreateFileInput = function (config) {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';

    var accept = GetValue(config, 'accept', '');
    var multiple = GetValue(config, 'multiple', false);

    fileInput.setAttribute('accept', accept);
    if (multiple) {
        fileInput.setAttribute('multiple', '');
    } else {
        fileInput.removeAttribute('multiple');
    }

    return fileInput;
}

export default CreateFileInput;