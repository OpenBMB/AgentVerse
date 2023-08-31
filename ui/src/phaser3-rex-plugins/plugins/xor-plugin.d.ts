import Encrypt from './string/xor/Encrypt';
import Decrypt from './string/xor/Decrypt';

export default class XORPlugin extends Phaser.Plugins.BasePlugin {
    Encrypt: typeof Encrypt;
    Decrypt: typeof Decrypt;
}