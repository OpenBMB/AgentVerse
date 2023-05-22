import Clear from '../../../utils/object/Clear.js';

class Achievements {
    constructor() {
        this.achievements = {};
        this.obtainedStates = {};
    }

    clear() {
        Clear(this.achievements);
        Clear(this.obtainedStates);

        return this;
    }

    add(levelName, achievementName, callback) {
        if (!this.achievements.hasOwnProperty(levelName)) {
            this.achievements[levelName] = [];
        }

        this.achievements[levelName].push({
            name: achievementName,
            function: callback
        });

        return this;
    }

    getAchievements(levelName) {
        return this.achievements[levelName];
    }

    getObtainedState(levelName, achievementName) {
        if (levelName === undefined) {
            return this.obtainedStates;
        }

        if (!this.obtainedStates.hasOwnProperty(levelName)) {
            this.obtainedStates[levelName] = {};
        }
        var obtainedStates = this.obtainedStates[levelName];

        if (achievementName === undefined) {
            return obtainedStates;
        }

        if (!obtainedStates.hasOwnProperty(achievementName)) {
            obtainedStates[achievementName] = {
                wasObtained: false,
                justObtained: false
            };
        }
        return obtainedStates[achievementName];
    }

    runTest(levelName, context) {
        var achievements = this.getAchievements(levelName);
        if (achievements === undefined) {
            return this;
        }

        var obtainedState;
        for (var i = 0, cnt = achievements.length; i < cnt; i++) {
            obtainedState = this.getObtainedState(levelName, achievements[i].name);
            obtainedState.justObtained = false;
            if (obtainedState.wasObtained) {
                continue;
            }

            if (!achievements[i].function(context)) {
                continue;
            }

            obtainedState.justObtained = true;
            obtainedState.wasObtained = true;
        }

        return this;
    }

    getTestResults(levelName, context) {
        this.runTest(levelName, context);
        return this.getObtainedState(levelName);
    }

    forEachObtainedState(levelName, callback, scope) {
        var achievements = this.getAchievements(levelName);
        if (achievements === undefined) {
            return this;
        }
        var achievementName, obtainedState;
        for (var i = 0, cnt = achievements.length; i < cnt; i++) {
            achievementName = achievements[i].name;
            obtainedState = this.getObtainedState(levelName, achievementName);
            if (scope) {
                callback.call(scope, levelName, achievementName, obtainedState);
            } else {
                callback(levelName, achievementName, obtainedState);
            }
        }

        return this;
    }

    getLevelNames(out) {
        if (out === undefined) {
            out = [];
        }
        for (var levelName in this.achievements) {
            out.push(levelName);
        }
        return out;
    }

    getAchievementNames(levelName, out) {
        if (out === undefined) {
            out = [];
        }
        var achievements = this.getAchievements(levelName);
        if (!achievements) {
            return out;
        }
        for (var i = 0, cnt = achievements.length; i < cnt; i++) {
            out.push(achievements[i].name);
        }
        return names;
    }

    loadObtainedStates(states) {
        this.obtainedStates = states;
        return this;
    }

    getObtainedStates() {
        return this.obtainedStates;
    }

    setObtainedState(levelName, achievementName, value) {
        if (value === undefined) {
            value = true;
        }
        var obtainedState = this.getObtainedState(levelName, achievementName);
        obtainedState.wasObtained = value;
        obtainedState.justObtained = value;
        return this;
    }

    clearObtainedState(levelName, achievementName) {
        this.setObtainedState(levelName, achievementName, gfalse);
        return this;
    }
}
export default Achievements;