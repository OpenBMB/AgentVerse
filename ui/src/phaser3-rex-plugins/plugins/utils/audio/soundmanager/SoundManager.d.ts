export default SoundManager;

declare namespace SoundManager {
    interface IConfig {
        bgm?: {
            volume?: number,
            loop?: boolean,
            fade?: number,
            initial?: Phaser.Sound.BaseSound
        },

        soundEffect?: {
            volume?: number,
        }
    }
}

declare class SoundManager {
    constructor(
        game: Phaser.Game | Phaser.Scene,
        config: SoundManager.IConfig
    );

    destroy(): this;

    // Background music
    setBackgroundMusicLoopValue(value: boolean): this;

    setBackgroundMusicFadeTime(time: number): this;

    getBackgroundMusic(): Phaser.Sound.BaseSound;

    playBackgroundMusic(key: string): this;

    pauseBackgroundMusic(): this;

    resumeBackgroundMusic(): this;

    stopBackgroundMusic(): this;

    fadeInBackgroundMusic(time: number): this;

    fadeOutBackgroundMusic(time: number, isStopped?: boolean): this;

    crossFadeBackgroundMusic(key: string, time: number): this;

    setBackgroundMusicVolume(volume: number): this;
    backgroundMusicVolume: number;

    // Background music2
    setBackgroundMusic2LoopValue(value: boolean): this;

    setBackgroundMusic2FadeTime(time: number): this;

    getBackgroundMusic2(): Phaser.Sound.BaseSound;

    playBackgroundMusic2(key: string): this;

    pauseBackgroundMusic2(): this;

    resumeBackgroundMusic2(): this;

    stopBackgroundMusic2(): this;

    fadeInBackgroundMusic2(time: number): this;

    fadeOutBackgroundMusic2(time: number, isStopped?: boolean): this;

    crossFadeBackgroundMusic2(key: string, time: number): this;

    setBackgroundMusicVolume2(volume: number): this;
    backgroundMusicVolume2: number;


    // Sound effect
    getSoundEffects(): Phaser.Sound.BaseSound[];

    getLastSoundEffect(): Phaser.Sound.BaseSound;

    playSoundEffect(key: string): this;

    fadeInSoundEffect(time: number): this;

    fadeOutSoundEffect(time: number, isStopped?: boolean): this;

    fadeOutAllSoundEffects(time: number, isStopped?: boolean): this;

    setSoundEffectVolume(volume: number, lastSoundEffect?: boolean): this;
    soundEffectsVolume: number;


    // Sound effect2
    getSoundEffects2(): Phaser.Sound.BaseSound[];

    getLastSoundEffect2(): Phaser.Sound.BaseSound;

    playSoundEffect2(key: string): this;

    fadeInSoundEffect2(time: number): this;

    fadeOutSoundEffect2(time: number, isStopped?: boolean): this;

    fadeOutAllSoundEffects2(time: number, isStopped?: boolean): this;

    setSoundEffect2Volume(volume: number, lastSoundEffect?: boolean): this;
    soundEffects2Volume: number;

}