import CreateBackground from '../builders/CreateBackground';

const GetValue = Phaser.Utils.Objects.GetValue;

var AddSeparator = function (config) {
    var scene = this.scene;

    // Create separator
    var separatorStyle = GetValue(this.styles, 'separator');
    var separator = CreateBackground(scene, config, separatorStyle);

    // Add separator
    this.add(
        separator,
        { expand: true }
    );

    return this;
}

export default AddSeparator;