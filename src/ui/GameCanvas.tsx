import { useEffect } from "react";

import {
  destroyGame,
  initializeGame
} from "@game/Game";

export function GameCanvas() {
  useEffect(() => {
    initializeGame();

    return () => {
      destroyGame();
    };
  }, []);

  return <div id="game-container" />;
}