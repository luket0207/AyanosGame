import "./Start.scss";
import { useState } from "react";

const Start = ({ setGameState, setGameConfig }) => {
  const [codeLength, setCodeLength] = useState(null); // No selection initially

  const handleStart = (difficulty) => {
    if (codeLength) {
      setGameConfig({ codeLength, difficulty }); // Pass config to App
      setGameState("game"); // Start the game
    }
  };

  return (
    <div className="Start">
      <h1>Start</h1>
      <p>わかりました</p>

      {/* Code Length Selection */}
      <h3>Select Code Length</h3>
      <div className="code-length-buttons">
        {[5, 6, 7, 8, 9, 10].map((length) => (
          <button
            key={length}
            className={codeLength === length ? "selected" : ""}
            onClick={() => setCodeLength(length)}
          >
            {length}
          </button>
        ))}
      </div>

      {/* Difficulty Selection (Only show if a code length is selected) */}
      {codeLength && (
        <>
          <h3>Select Difficulty</h3>
          <div className="difficulty-buttons">
            {["easy", "medium", "hard", "extreme", "impossible"].map((level) => (
              <button key={level} onClick={() => handleStart(level)}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Start;
