import { Text } from './text';
export enum Agents {
  PLAYER_speak,
  NPC_speak,
}
export class Message extends Text {
  private message: string;
  constructor(scene: Phaser.Scene, x: number, y: number, initMessage = "") {
    super(scene, x, y, `Message: ${initMessage}`);
    scene.add.existing(this);
    this.message = initMessage;
  }

  // Require to Fix the following code.
  public updateMessage(operation: Agents, message_player: string, message_npc: string): void {
    switch (operation) {
      case Agents.PLAYER_speak:
        this.message += "PLAYER:" + "Message from backend" + "\n";
        break;
      case Agents.NPC_speak:
        this.message += "NPC:" + "Message from backend" + "\n";
        break;
      default:
        break;
    }
    this.setText(`Message: ${this.message}`);
  }
  public getMessage(): string {
    return this.message;
  }
}
