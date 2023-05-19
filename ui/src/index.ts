import { Game, Scale, Types, WEBGL } from "phaser";

import { TownScene, LoadingScene, TextboxScene } from "./scenes";

declare global {
  interface Window {
    sizeChanged: () => void;
    game: Game;
  }
}

export const gameConfig: Types.Core.GameConfig = {
  title: "Phaser game tutorial",
  type: WEBGL,
  parent: "game",
  // backgroundColor: '#351f1b',
  scale: {
    mode: Scale.ScaleModes.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [LoadingScene, TownScene, TextboxScene],
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);

      window.game.canvas.setAttribute(
        "style",
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
      );
    }, 100);
  }
};

window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);
