import WaitCallback from './WaitCallback.js';
import WaitTime from './WaitTime.js';
import WaitClick from './WaitClick.js';
import WaitMusic from './WaitMusic.js';
import { IsWaitCameraEffect, WaitCameraEffect } from './WaitCameraEffect.js';
import WaitKeyDown from './WaitKeyDown.js';
import { IsWaitGameObject, WaitGameObject } from './WaitGameObject.js';

const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

var WaitMultiple = function (tagPlayer, names, callback, args, scope) {
    if ((typeof (names) === 'string') && (names.length > 1) && (names.indexOf('|') !== -1)) {
        names = names.split('|');
    } else {
        names = [names];
    }

    for (var i = 0, cnt = names.length; i < cnt; i++) {
        var name = names[i];

        if ((name == null) || (name === 'wait')) {  // Wait event
            WaitCallback(tagPlayer, undefined, callback, args, scope);

        } else if ((typeof (name) === 'number') || !isNaN(name)) { // A number, or a number string
            WaitTime(tagPlayer, parseFloat(name), callback, args, scope);

        } else if (name === 'click') {  // 'click'
            WaitClick(tagPlayer, callback, args, scope);

        } else if (name === 'se') {
            var music = tagPlayer.soundManager.getLastSoundEffect();
            WaitMusic(tagPlayer, music, callback, args, scope);

        } else if (name === 'se2') {
            var music = tagPlayer.soundManager.getLastSoundEffect2();
            WaitMusic(tagPlayer, music, callback, args, scope);

        } else if (name === 'bgm') {
            var music = tagPlayer.soundManager.getBackgroundMusic();
            WaitMusic(tagPlayer, music, callback, args, scope);

        } else if (name === 'bgm2') {
            var music = tagPlayer.soundManager.getBackgroundMusic2();
            WaitMusic(tagPlayer, music, callback, args, scope);

        } else if (KeyCodes.hasOwnProperty(name.toUpperCase())) {
            WaitKeyDown(tagPlayer, name, callback, args, scope);

        } else if (IsWaitCameraEffect(name)) {
            WaitCameraEffect(tagPlayer, name, callback, args, scope);

        } else if (IsWaitGameObject(tagPlayer, name)) {
            WaitGameObject(tagPlayer, name, callback, args, scope);

        } else {
            WaitCallback(tagPlayer, name, callback, args, scope);

        }
    }
}

export default WaitMultiple;