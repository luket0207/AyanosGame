import { useState } from "react";
import "./App.scss";
import Game from "./Pages/Game/Game";
import Start from "./Pages/Start/Start";

function App() {
  const [gameState, setGameState] = useState("start");
  const [gameConfig, setGameConfig] = useState({ codeLength: 6, difficulty: "easy" });
  const [theme, setTheme] = useState("Pokemon");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [language, setLanguage] = useState("en");

  const changeTheme = (newTheme) => {
    setOverlayVisible(true); // Fade in the white overlay
    setTimeout(() => {
      setTheme(newTheme);
      setTimeout(() => {
        setOverlayVisible(false); // Fade out the overlay after theme change
      }, 300);
    }, 600);
  };

  const changeLanguage = (newLang) => {
    setOverlayVisible(true); // Fade in the white overlay
    setTimeout(() => {
      setLanguage(newLang);
      setTimeout(() => {
        setOverlayVisible(false); // Fade out the overlay after theme change
      }, 300);
    }, 600);
  };

  return (
    <div className={`App ${theme} ${language}`}>
      <div className={`theme-overlay ${overlayVisible ? "overlay-visible" : ""}`}></div>
      {gameState === "start" ? (
        <Start setGameState={setGameState} setGameConfig={setGameConfig} setTheme={changeTheme} theme={theme} language={language} setLanguage={changeLanguage} />
      ) : (
        <Game setGameState={setGameState} codeLength={gameConfig.codeLength} difficulty={gameConfig.difficulty} theme={theme} language={language} />
      )}
    </div>
  );
}

export default App;
