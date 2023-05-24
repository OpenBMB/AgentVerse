var ParseValue = function (propertyValue, startValue) {
    // propertyValue : number or string
    if (typeof (propertyValue) === 'number') {
        return propertyValue;
    } else {
        var op = propertyValue[0];
        var num = parseFloat(propertyValue.substr(2));
        switch (op) {
            case '+': return startValue + num;
            case '-': return startValue - num;
            case '*': return startValue * num;
            case '/': return startValue / num;
        }
    }
}

export default ParseValue;