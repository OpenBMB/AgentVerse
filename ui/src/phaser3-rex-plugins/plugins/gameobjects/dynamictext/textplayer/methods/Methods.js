import GameObjectManagerMethods from './gameobjectmanager/GameObjectManagerMethods.js';
import SetClickTarget from './SetClickTarget.js';
import SetTargetCamera from './SetTargetCamera.js';
import SetNextPageInput from './SetNextPageInput.js';
import AddImage from './AddImage.js';
import PlayMethods from './PlayMethods.js';
import TypingNextPage from './TypingNextPage.js';
import PauseMethods from './PauseMethods.js';
import ResumeMethods from './ResumeMethods.js';
import Wait from './Wait.js';
import TypingSpeedMethods from './TypingSpeedMethods.js';
import SetIgnoreWait from './SetIgnoreWait.js';
import SetIgnoreNextPageInput from './SetIgnoreNextPageInput.js';
import ShowPage from './ShowPage.js';
import SpriteMethods from './spritemanager/SpriteMethods.js';
import ContentMethods from './ContentMethods.js';

var Methods = {
    setClickTarget: SetClickTarget,
    setTargetCamera: SetTargetCamera,
    setNextPageInput: SetNextPageInput,
    addImage: AddImage,
    typingNextPage: TypingNextPage,
    wait: Wait,
    setIgnoreWait: SetIgnoreWait,
    setIgnoreNextPageInput: SetIgnoreNextPageInput,
    showPage: ShowPage,
}

Object.assign(
    Methods,
    GameObjectManagerMethods,
    PlayMethods,
    PauseMethods,
    ResumeMethods,
    TypingSpeedMethods,
    SpriteMethods,
    ContentMethods,
);

export default Methods;