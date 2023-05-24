var RemoveElement = function (element) {
    if (!element) {
        return;
    }

    var parentElement = element.parentElement;
    if (parentElement) {
        parentElement.removeChild(element);
    }
}

export default RemoveElement;