import GetValue from '../../../utils//object/GetValue.js';
import RetryAddRandomAliasTransaction from './RetryAddRandomAliasTransaction.js';

var GetRandomAlias = function (id, config) {
    var digits = GetValue(config, 'digits', 10);
    var candidates = GetValue(config, 'candidates', '0123456789');
    var retry = GetValue(config, 'retry', 1000);

    var self = this;
    return this.getAlias(id)
        .then(function (result) {
            if (result.alias) {
                return Promise.resolve(result);
            } else {
                return RetryAddRandomAliasTransaction.call(self, id, digits, candidates, retry);
            }
        })
};

export default GetRandomAlias;