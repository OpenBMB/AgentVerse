import AppendData from './data/pngappender/AppendData';
import ExtractData from './data/pngappender/ExtractData';

export default class PNGAppenderPlugin extends Phaser.Plugins.BasePlugin {
    append: typeof AppendData;
    extract: typeof ExtractData;
}