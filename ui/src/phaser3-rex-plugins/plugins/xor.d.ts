import Encrypt from './string/xor/Encrypt';
import Decrypt from './string/xor/Decrypt';

declare var Methods: {
    Encrypt: typeof Encrypt,
    Decrypt: typeof Decrypt
};

export default Methods;