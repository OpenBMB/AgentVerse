const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const UUID = Phaser.Utils.String.UUID;

var AddPage = function (key, tabGameObject, pageGameObject) {
    if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key');
        tabGameObject = GetValue(config, 'tab');
        pageGameObject = GetValue(config, 'page');
    }

    if (!key) {
        key = UUID();
    }

    tabGameObject.name = key;  // For ratio buttons

    this.childrenMap.tabs.addButton(tabGameObject);
    this.childrenMap.pages.addPage(pageGameObject, { key: key });

    return this;
}

export default AddPage;