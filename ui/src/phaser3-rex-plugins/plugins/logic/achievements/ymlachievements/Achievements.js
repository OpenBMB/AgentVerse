import Base from '../achievements/Achievements.js';
import ParseYaml from '../../../utils/yaml/ParseYaml.js';
import CreateTestFunction from '../../../math/expressionparser/utils/Complile.js';

class Achievements extends Base {
    loadYML(ymlString) {
        this.clear();

        var doc = ParseYaml(ymlString);
        if (!doc) {
            return this;
        }

        for (var levelName in doc) {
            var levelAchevements = doc[levelName];
            for (var achievementName in levelAchevements) {
                this.add(levelName, achievementName, CreateTestFunction(levelAchevements[achievementName]));
            }
        }

        return this;
    }
}
export default Achievements;