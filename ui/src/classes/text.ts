import { GameObjects, Scene } from 'phaser';
export class Text extends GameObjects.Text {
  constructor(scene: Scene, x: number, y: number, text: string) {
    super(scene, x, y, text, {
      fontSize: 'calc(100vw / 100)',
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4,
    });
    this.setOrigin(0, 0);
    // this.getBody().setOffset(0, 0);
    scene.add.existing(this);
  }
}

/*
plugin (text box): https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-textbox/
*/
