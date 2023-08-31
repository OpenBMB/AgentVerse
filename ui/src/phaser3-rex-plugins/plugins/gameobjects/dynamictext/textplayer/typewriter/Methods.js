import TypingSpeedMethods from './TypingSpeedMethods.js';
import FadeOutPage from './FadeOutPage.js';
import Start from './Start.js';
import Typing from './Typing.js';
import Pause from './Pause.js';
import Resume from './Resume.js';
import PauseTyping from './PauseTyping.js';
import ResumeTyping from './ResumeTyping.js';
import Wait from './Wait.js';
import SetIgnoreWait from './SetIgnoreWait.js';
import SetSkipSpaceEnable from './SetSkipSpaceEnable.js';
import SetSkipTypingAnimation from './SetSkipTypingAnimation.js';
import SetSkipSoundEffect from './SetSkipSoundEffect.js';
import SkipCurrentTypingDelay from './SkipCurrentTypingDelay.js';

var Methods = {
    fadeOutPage: FadeOutPage,
    start: Start,
    typing: Typing,
    pause: Pause,
    resume: Resume,
    pauseTyping: PauseTyping,
    resumeTyping: ResumeTyping,
    wait: Wait,
    setIgnoreWait: SetIgnoreWait,
    setSkipSpaceEnable: SetSkipSpaceEnable,
    setSkipTypingAnimation: SetSkipTypingAnimation,
    setSkipSoundEffect: SetSkipSoundEffect,
    skipCurrentTypingDelay: SkipCurrentTypingDelay,
}

Object.assign(
    Methods,
    TypingSpeedMethods
);

export default Methods;