import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./GuessLog.scss";
import languages from "../../Components/Languages/Languages";

const GuessLog = ({
  closeLog,
  isLogOpen,
  guessHeight,
  guessLog,
  difficulty,
  theme,
  type,
  setGameState,
  language,
}) => {
  useEffect(() => {
    if (isLogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLogOpen]);

  return (
    <div
      className={`guess-log-menu ${isLogOpen ? "open" : ""}`}
      style={{ height: isLogOpen ? `calc(100vh - ${guessHeight}px)` : "0px" }}
    >
      {/* Close Button */}
      <div className="close-btn" onClick={closeLog}>
        <FontAwesomeIcon icon={faTimes} />
      </div>

      {/* Show Log Only if Type is "log" */}
      {type === "log" ? (
        <div className="guess-log">
          <h2>{languages[language].guessLog}</h2>
          <div
            className="guess-log-container"
            style={{ maxHeight: `calc(100vh - ${guessHeight + 160}px)` }}
            onWheel={(e) => e.stopPropagation()} // Stop event bubbling
          >
            {guessLog.length === 0 ? (
              <p className="no-guesses">{languages[language].noGuesses}</p>
            ) : (
              guessLog.map((entry, index) => (
                <div key={index} className="log-entry">
                  <p>
                    {languages[language].guess} {index + 1}
                  </p>
                  <div className="log-entry-container">
                    {entry.guess.map((icon, i) => (
                      <div
                        key={i}
                        className={`log-slot ${
                          entry.correctPositions[i] &&
                          difficulty !== "impossible"
                            ? "correct"
                            : entry.inAnswerPositions[i] &&
                              (difficulty === "medium" || difficulty === "hard")
                            ? "in-answer"
                            : difficulty === "impossible"
                            ? "impossible"
                            : "incorrect"
                        }`}
                      >
                        <img
                          src={require(`../../Assets/Images/${theme}/${icon}.png`)}
                          alt={icon}
                          className="game-img"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Quit Confirmation UI */
        <div className="game-quit">
          <p>{languages[language].confirmQuit}</p>
          <div className="quit-buttons">
            <button className="quit-no" onClick={closeLog}>
              {languages[language].no}
            </button>
            <button
              className="quit-yes"
              onClick={() => {
                setGameState("start");
                closeLog();
              }}
            >
              {languages[language].yes}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuessLog;
