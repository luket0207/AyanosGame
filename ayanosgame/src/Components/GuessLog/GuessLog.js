import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./GuessLog.scss";

const GuessLog = ({
  closeLog,
  isLogOpen,
  guessHeight,
  guessLog,
  difficulty,
  theme,
  type,
  setGameState,
}) => {
  return (
    <div
      className={`guess-log-menu ${isLogOpen ? "open" : ""}`}
      style={{ height: isLogOpen ? `calc(100vh - ${guessHeight}px)` : "0px" }}
    >
      {/* Close Button (Always Visible) */}
      <div className="close-btn" onClick={closeLog}>
        <FontAwesomeIcon icon={faTimes} />
      </div>

      {/* Show Log Only if Type is "log" */}
      {type === "log" ? (
        <div className="guess-log">
          <h2>Guess Log</h2>
          <div
            className="guess-log-container"
            style={{ maxHeight: `calc(100vh - ${guessHeight + 160}px)` }}
          >
            {guessLog.length === 0 ? (
              <p className="no-guesses">
                Guesses will appear here after you make them
              </p>
            ) : (
              guessLog.map((entry, index) => (
                <div key={index} className="log-entry">
                  <p>Guess {index + 1}</p>
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
          <p>Are you sure you want to quit?</p>
          <div className="quit-buttons">
            <button className="quit-no" onClick={closeLog}>
              No
            </button>
            <button
              className="quit-yes"
              onClick={() => {
                setGameState("start");
                closeLog();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuessLog;
