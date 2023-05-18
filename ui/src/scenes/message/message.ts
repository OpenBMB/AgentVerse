import { Scene } from 'phaser';
import {Message, Agents} from '../../classes/message';

import { EVENTS_NAME } from '../../conversation';

export class MessageScene extends Scene {
  private message!: Message;
  constructor() {
    super('message-scene');
  }
  create(): void {
    this.message = new Message(this, 0, 560, "Receieve Message");
  }
}