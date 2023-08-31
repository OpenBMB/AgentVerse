import MarkedEventSheets from './logic/eventsheets/markedeventsheets/MarkedEventSheets.js';

export default class MarkedEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: MarkedEventSheets.IConfig
    ): MarkedEventSheets;

}