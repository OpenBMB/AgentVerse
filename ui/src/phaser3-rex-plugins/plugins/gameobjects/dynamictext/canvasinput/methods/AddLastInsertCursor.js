import AddChild from '../../dynamictext/methods/AddChild.js';

var AddLastInsertCursor = function (textObject) {
    var child = textObject.createCharChild('|');  // Use '|' to update render size
    child.text = '';  // Render empty string ''

    // Invoke DynamicText's addChild method directly
    AddChild.call(textObject, child);

    return child;
}

export default AddLastInsertCursor;