import { useState } from "react";
import "./App.css";
import Game from "./Pages/Game/Game";
import Start from "./Pages/Start/Start";

function App() {
  const [gameState, setGameState] = useState("start");
  const [gameConfig, setGameConfig] = useState({ codeLength: 6, difficulty: "easy" });

  return (
    <div className="App">
      {gameState === "start" ? (
        <Start setGameState={setGameState} setGameConfig={setGameConfig} />
      ) : (
        <Game setGameState={setGameState} codeLength={gameConfig.codeLength} difficulty={gameConfig.difficulty} />
      )}
    </div>
  );
}

export default App;
