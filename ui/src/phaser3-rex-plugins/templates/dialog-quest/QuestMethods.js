export default {
    start(key) {
        this.questionManager
            .restartQuest()
            .getNextQuestion(key);
        return this;
    },

    next(key) {
        this.questionManager
            .getNextQuestion(key);
        return this;
    },

    isLast() {
        return this.questionManager.isLastQuestion();
    },
};