import BracketParser from './bracketparser';

export default class BracketParserPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: BracketParser.IConfig
    ): BracketParser;

}