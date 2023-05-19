import AwaitFile from '../../../../loader/awaitloader/AwaitFile.js';
import LoadScriptPromise from '../../../../utils/loader/LoadScriptPromise.js';
import InitializeCubism from '../../utils/Initialize.js';
import {
    IsIdle as IsCoreNotLoad,
    SetState as SetCoreScriptState,
    LOADING, LOADED
} from './Live2dCoreScriptState.js';

class Live2dCoreScriptFile extends AwaitFile {
    constructor(loader, url) {
        if (url === undefined) {
            url = 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js';
        }

        var callback = function (successCallback, failureCallback) {
            LoadScriptPromise(url)
                .then(function () {
                    InitializeCubism();

                    SetCoreScriptState(LOADED);

                    successCallback();
                })
        }

        if (IsCoreNotLoad) {
            SetCoreScriptState(LOADING);
        }

        super(loader, {
            type: 'live2dcore',
            key: 'live2dcore',
            config: { callback: callback }
        })
    }
}

export default Live2dCoreScriptFile;