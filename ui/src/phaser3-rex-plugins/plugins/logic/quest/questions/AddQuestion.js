var AddQuestion = function (question) {
    Polyfills.call(this, question);

    // Remove duplicated question
    var key = question.key;
    if (this.questionMap.hasOwnProperty(key)) {
        this.remove(key);
    }

    // Add question
    this.questions.push(question);
    this.questionMap[key] = question;

    return this;
}

var Polyfills = function (question) {
    var options = question.options;
    if (options) {
        // Apply key via serial number        
        for (var i = 0, cnt = options.length; i < cnt; i++) {
            var option = options[i];
            if (!option.hasOwnProperty('key')) {
                option.key = `_${i}`;
            }
        }
    }

    if (!question.hasOwnProperty('key')) {
        // Apply key via serial numbers
        question.key = `_${this.questions.length}`;
    }
}

export default AddQuestion;
