// import * as Phaser from 'phaser';
export default HorrifiPostFxPipeline;

declare namespace HorrifiPostFxPipeline {
    interface IConfig {
        enable?: boolean,

        // Bloom
        bloomEnable?: boolean,
        bloomRadius?: number, bloomIntensity?: number, bloomThreshold?: number,
        bloomTexelWidth?: number, bloomTexelHeight?: number,

        // Chromatic abberation
        chromaticEnable?: boolean,
        chabIntensity?: number,

        // Vignette
        vignetteEnable?: boolean,
        vignetteStrength?: number, vignetteIntensity?: number,

        // Noise
        noiseEnable?: boolean,
        noiseStrength?: number,
        noiseSeed?: number,

        // VHS
        vhsEnable?: boolean,
        vhsStrength?: number,

        // Scanlines
        scanlinesEnable?: boolean,
        scanStrength?: number,

        // CRT
        crtEnable?: boolean,
        crtWidth?: number, crtHeight?: number,

    }
}

declare class HorrifiPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {

    // Bloom
    bloomEnable: boolean;
    bloomRadius: number;
    bloomIntensity: number;
    bloomThreshold: number;
    bloomTexelWidth: number;
    bloomTexelHeight: number;

    // Chromatic abberation
    chromaticEnable: boolean;
    chabIntensity: number;

    // Vignette
    vignetteEnable: boolean;
    vignetteStrength: number;
    vignetteIntensity: number;

    // Noise
    noiseEnable: boolean;
    noiseStrength: number;
    noiseSeed: number;

    // VHS
    vhsEnable: boolean;
    vhsStrength: number;

    // Scanlines
    scanlinesEnable: boolean;
    scanStrength: number;

    // CRT
    crtEnable: boolean;
    crtWidth: number;
    crtHeight: number;

    // Bloom
    setBloomEnable(enable?: boolean): this;
    setBloomRadius(value: number): this;
    setBloomIntensity(value: number): this;
    setBloomThreshold(value: number): this;
    setBloomTexelSize(width: number, height?: number): this;

    // Chromatic abberation
    setChromaticEnable(enable?: boolean): this;
    setChabIntensity(value: number): this;

    // Vignette
    setVignetteEnable(Genable?: boolean): this;
    setVignetteStrength(value: number): this;
    setVignetteIntensity(value: number): this;

    // Noise
    setNoiseEnable(enable?: boolean): this;
    setNoiseStrength(value: number): this;
    setNoiseSeed(value: number): this;

    // VHS
    setVHSEnable(enable?: boolean): this;
    setVhsStrength(value: number): this;

    // Scanlines
    setScanlinesEnable(enable?: boolean): this;
    setScanStrength(value: number): this;

    // CRT
    setCRTEnable(enable?: boolean): this;
    setCrtSize(width: number, height?: number): this;

}