import FragSrc from './horrifi-postfxfrag.js';
import Methods from './methods/Methods.js';
import GetTickDelta from '../../utils/system/GetTickDelta.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class HorrifiPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexHorrifiPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });
        
        this.now = 0;

        // Bloon
        this.bloomEnable = false;
        this.bloomRadius = 0;
        this.bloomIntensity = 0;
        this.bloomThreshold = 0;
        this.bloomTexelWidth = 0;
        this.bloomTexelHeight = 0;

        // Chromatic abberation
        this.chromaticEnable = false;
        this.chabIntensity = 0;

        // Vignette
        this.vignetteEnable = false;
        this.vignetteStrength = 0;
        this.vignetteIntensity = 0;

        // Noise
        this.noiseEnable = false;
        this.noiseStrength = 0;
        this.noiseSeed = Math.random();

        // VHS
        this.vhsEnable = false;
        this.vhsStrength = 0;

        // Scanlines
        this.scanlinesEnable = false;
        this.scanStrength = 0;

        // CRT
        this.crtEnable = false;
        this.crtWidth = 0;
        this.crtHeight = 0;
    }

    resetFromJSON(o) {
        var enable = GetValue(o, 'enable', false);

        // Bloom
        this.setBloomEnable(GetValue(o, 'bloomEnable', enable));
        this.setBloomRadius(GetValue(o, 'bloomRadius', 0));
        this.setBloomIntensity(GetValue(o, 'bloomIntensity', 0));
        this.setBloomThreshold(GetValue(o, 'bloomThreshold', 0));
        this.setBloomTexelSize(GetValue(o, 'bloomTexelWidth', 0), GetValue(o, 'bloomTexelHeight'));

        // Chromatic abberation
        this.setChromaticEnable(GetValue(o, 'chromaticEnable', enable));
        this.setChabIntensity(GetValue(o, 'chabIntensity', 0));

        // Vignette
        this.setVignetteEnable(GetValue(o, 'vignetteEnable', enable));
        this.setVignetteStrength(GetValue(o, 'vignetteStrength', 0));
        this.setVignetteIntensity(GetValue(o, 'vignetteIntensity', 0));

        // Noise
        this.setNoiseEnable(GetValue(o, 'noiseEnable', enable));
        this.setNoiseStrength(GetValue(o, 'noiseStrength', 0));
        this.setNoiseSeed(GetValue(0, 'noiseSeed', Math.random()));

        // VHS
        this.setVHSEnable(GetValue(o, 'vhsEnable', enable));
        this.setVhsStrength(GetValue(o, 'vhsStrength', 0));

        // Scanlines
        this.setScanlinesEnable(GetValue(o, 'scanlinesEnable', enable));
        this.setScanStrength(GetValue(o, 'scanStrength', 0));

        // CRT
        this.setCRTEnable(GetValue(o, 'crtEnable', enable));
        this.setCrtSize(GetValue(o, 'crtWidth', 0), GetValue(o, 'crtHeight', undefined));

        return this;
    }

    onPreRender() {
        this.set1f('noiseSeed', this.noiseSeed);

        // Bloon
        this.set1f('bloomEnable', (this.bloomEnable) ? 1 : 0);
        this.set3f('bloom', this.bloomRadius, this.bloomIntensity, this.bloomThreshold);
        this.set2f('bloomTexel', this.bloomTexelWidth, this.bloomTexelHeight);

        // Chromatic abberation
        this.set1f('chromaticEnable', (this.chromaticEnable) ? 1 : 0);
        this.set1f('chabIntensity', this.chabIntensity);

        // Vignette
        this.set1f('vignetteEnable', (this.vignetteEnable) ? 1 : 0);
        this.set2f('vignette', this.vignetteStrength, this.vignetteIntensity);

        // Noise
        this.set1f('noiseEnable', (this.noiseEnable) ? 1 : 0);
        this.set1f('noiseStrength', this.noiseStrength);

        // VHS
        this.set1f('vhsEnable', (this.vhsEnable) ? 1 : 0);
        this.set1f('vhsStrength', this.vhsStrength);

        // Scanlines
        this.set1f('scanlinesEnable', (this.scanlinesEnable) ? 1 : 0);
        this.set1f('scanStrength', this.scanStrength);

        // CRT        
        this.set1f('crtEnable', (this.crtEnable) ? 1 : 0);
        this.set2f('crtSize', this.crtWidth, this.crtHeight);

        // Eanble by VHS    
        if (this.vhsEnable) {
            this.now += GetTickDelta(this.game);
        }
        this.set1f('time', this.now);
    }
}

Object.assign(
    HorrifiPostFxPipeline.prototype,
    Methods
)

export default HorrifiPostFxPipeline;