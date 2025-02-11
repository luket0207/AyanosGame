import { useState } from "react";
import "./App.scss";
import Game from "./Pages/Game/Game";
import Start from "./Pages/Start/Start";

function App() {
  const [gameState, setGameState] = useState("start");
  const [gameConfig, setGameConfig] = useState({ codeLength: 6, difficulty: "easy" });
  const [theme, setTheme] = useState("Pokemon");
  return (
    <div className={`App ${theme}`}>
      {gameState === "start" ? (
        <Start setGameState={setGameState} setGameConfig={setGameConfig} />
      ) : (
        <Game setGameState={setGameState} codeLength={gameConfig.codeLength} difficulty={gameConfig.difficulty} />
      )}
    </div>
  );
}

export default App;
