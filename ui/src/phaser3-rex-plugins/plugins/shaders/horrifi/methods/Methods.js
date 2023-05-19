import SetEnable from './SetEnable.js';
import BloonConfigurationMethods from './BloonConfigurationMethods.js';
import ChromaticConfigurationMethods from './ChromaticConfigurationMethods.js';
import VignetteConfigurationMethod from './VignetteConfigurationMethod.js';
import NoiseConfigurationMethod from './NoiseConfigurationMethod.js';
import VHSConfigurationMethod from './VHSConfigurationMethod.js';
import ScanlinesConfigurationMethod from './ScanlinesConfigurationMethod.js';
import CRTConfigurationMethod from './CRTConfigurationMethod.js';

var Methods = {
    setEnable: SetEnable
};

Object.assign(
    Methods,
    BloonConfigurationMethods,
    ChromaticConfigurationMethods,
    VignetteConfigurationMethod,
    NoiseConfigurationMethod,
    VHSConfigurationMethod,
    ScanlinesConfigurationMethod,
    CRTConfigurationMethod,
)

export default Methods;