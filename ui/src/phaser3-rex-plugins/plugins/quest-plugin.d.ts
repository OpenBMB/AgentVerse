import QuestionManager from './quest';

export default class QuestPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: QuestionManager.IConfig
    ): QuestionManager;

}