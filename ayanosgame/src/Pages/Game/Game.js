import "./Game.scss";
import React, { useState, useEffect, useRef } from "react";
import { imageSets } from "../../Assets/Images/ImageSets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faQuestion,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import GuessLog from "../../Components/GuessLog/GuessLog";
import languages from "../../Components/Languages/Languages";

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getImageSet = (theme) => {
  switch (theme) {
    case "Pokemon":
      return imageSets.pokemon;
    case "Dogs":
      return imageSets.dogs;
    case "OnePiece":
      return imageSets.onePiece;
    default:
      return imageSets.pokemon; // Fallback to default (pokemon)
  }
};

const Game = ({
  codeLength = 6,
  difficulty = "easy",
  setGameState,
  theme = "Pokemon",
  language = "en",
}) => {
  let maxGuesses;
  switch (difficulty) {
    case "easy":
      maxGuesses = Math.ceil(codeLength / 2);
      break;
    case "medium":
      maxGuesses = codeLength - 2;
      break;
    case "hard":
      maxGuesses = codeLength;
      break;
    case "extreme":
      maxGuesses = codeLength + codeLength;
      break;
    case "impossible":
      maxGuesses = codeLength + codeLength;
      break;
    default:
      maxGuesses = codeLength;
  }

  const [icons, setIcons] = useState([]);
  const [guess, setGuess] = useState(Array(codeLength).fill(null));
  const [hiddenAnswer, setHiddenAnswer] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedGuessIndex, setSelectedGuessIndex] = useState(null);
  const [guessesLeft, setGuessesLeft] = useState(maxGuesses);
  const [correctPositions, setCorrectPositions] = useState(
    Array(codeLength).fill(false)
  );
  const [inAnswerPositions, setInAnswerPositions] = useState(
    Array(codeLength).fill(false)
  );
  const [gameStatus, setGameStatus] = useState(null); // "win", "lose", or null
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCorrectIcons, setTotalCorrectIcons] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [guessLog, setGuessLog] = useState([]); // Stores all past guesses
  const [menuState, setMenuState] = useState({ open: false, type: null });
  const guessRef = useRef(null); // Ref for measuring height
  const [guessHeight, setGuessHeight] = useState(0);
  const iconRef = useRef(null);

  useEffect(() => {
    const selectedImageSet = getImageSet(theme);
    // Determine the number of icons based on difficulty
    let iconCount;
    switch (difficulty) {
      case "easy":
        iconCount = codeLength;
        break;
      case "medium":
        iconCount = codeLength + (codeLength - 3);
        break;
      case "hard":
      case "extreme":
      case "impossible":
        iconCount = codeLength + codeLength;
        break;
      default:
        iconCount = codeLength;
    }

    const shuffledIcons = shuffleArray(selectedImageSet).slice(0, iconCount);
    setIcons(shuffledIcons);

    const answer = shuffleArray([...shuffledIcons]).slice(0, codeLength);
    setHiddenAnswer(answer);
    console.log(answer);
  }, [codeLength, difficulty]);

  useEffect(() => {
    // Click outside to deselect icon
    const handleClickOutside = (event) => {
      if (iconRef.current && !iconRef.current.contains(event.target)) {
        setSelectedIcon(null);
        setSelectedGuessIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateGuessHeight = () => {
      if (guessRef.current) {
        setGuessHeight(guessRef.current.offsetHeight);
      }
    };

    updateGuessHeight();
    window.addEventListener("resize", updateGuessHeight);
    return () => window.removeEventListener("resize", updateGuessHeight);
  }, []);

  const placedIcons = new Set(guess.filter((icon) => icon !== null));

  let clickTimer = null; // Timer to differentiate between single and double clicks

  const handleIconClick = (icon) => {
    if (selectedGuessIndex !== null) {
      // Swap the selected guess with the clicked icon from the icons array
      const newGuess = [...guess];

      // Store the old icon before replacement
      const oldIcon = newGuess[selectedGuessIndex];

      newGuess[selectedGuessIndex] = icon; // Place the clicked icon into the guess array

      setGuess(newGuess);

      // Return the old icon to the icons array if it was a valid icon
      if (oldIcon) {
        setIcons((prevIcons) =>
          prevIcons.includes(oldIcon) ? prevIcons : [...prevIcons, oldIcon]
        );
      }

      // Reset selection
      setSelectedGuessIndex(null);
      setSelectedIcon(null);
    } else if (!placedIcons.has(icon)) {
      setSelectedIcon(icon);
      setSelectedGuessIndex(null);
    }
  };

  const handleIconDoubleClick = (icon) => {
    if (clickTimer) {
      clearTimeout(clickTimer); // Cancel the single-click timer
      clickTimer = null;
    }

    const newGuess = [...guess];

    // Check if the icon already exists in the guess array
    if (newGuess.includes(icon)) {
      return; // Prevent duplicate placement
    }

    const firstEmptyIndex = newGuess.indexOf(null);

    if (firstEmptyIndex !== -1) {
      newGuess[firstEmptyIndex] = icon;
      setGuess(newGuess);
    }
  };

  const handleGuessClick = (index) => {
    if (selectedIcon) {
      const newGuess = [...guess];
      newGuess[index] = selectedIcon;
      setGuess(newGuess);
      setSelectedIcon(null);

      // Reset feedback classes when modifying a slot
      resetFeedbackForSlot(index);
    } else if (guess[index]) {
      setSelectedGuessIndex(index);
      setSelectedIcon(guess[index]);
    } else if (selectedGuessIndex !== null) {
      const newGuess = [...guess];
      [newGuess[selectedGuessIndex], newGuess[index]] = [
        newGuess[index],
        newGuess[selectedGuessIndex],
      ];
      setGuess(newGuess);
      setSelectedGuessIndex(null);
      setSelectedIcon(null);

      // Reset feedback classes when swapping
      resetFeedbackForSlot(index);
      resetFeedbackForSlot(selectedGuessIndex);
    }
  };

  const handleSwap = (index) => {
    if (selectedGuessIndex !== null && selectedGuessIndex !== index) {
      const newGuess = [...guess];
      [newGuess[selectedGuessIndex], newGuess[index]] = [
        newGuess[index],
        newGuess[selectedGuessIndex],
      ];
      setGuess(newGuess);
      setSelectedGuessIndex(null);
      setSelectedIcon(null);

      // Reset feedback classes for both swapped slots (without overwriting)
      resetFeedbackForSlot(index);
      resetFeedbackForSlot(selectedGuessIndex);
    }
  };

  // Function to reset feedback for a modified slot (using functional updates)
  const resetFeedbackForSlot = (index) => {
    setCorrectPositions((prev) => {
      return prev.map((val, i) => (i === index ? false : val));
    });

    setInAnswerPositions((prev) => {
      return prev.map((val, i) => (i === index ? false : val));
    });
  };

  const handleSubmitGuess = () => {
    if (guess.includes(null)) return;

    let correct = 0;
    let totalCorrect = 0;
    let newCorrectPositions = Array(codeLength).fill(false);
    let newInAnswerPositions = Array(codeLength).fill(false);

    guess.forEach((icon, index) => {
      if (icon === hiddenAnswer[index]) {
        correct++;
        newCorrectPositions[index] = true;
      }
      if (hiddenAnswer.includes(icon)) {
        totalCorrect++;
        newInAnswerPositions[index] = true;
      }
    });

    setCorrectPositions(newCorrectPositions);
    setInAnswerPositions(newInAnswerPositions);
    setCorrectCount(correct);
    setTotalCorrectIcons(totalCorrect);

    // Store this guess in the log with feedback
    setGuessLog((prevLog) => [
      ...prevLog,
      {
        guess: [...guess],
        correctPositions: newCorrectPositions,
        inAnswerPositions: newInAnswerPositions,
      },
    ]);

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (correct === codeLength) {
        setGameStatus("win");
      } else if (guessesLeft - 1 === 0) {
        setGameStatus("lose");
      } else {
        setGuessesLeft((prev) => prev - 1);
      }
    }, 1000);
  };

  const handleCloseLog = () => {
    setMenuState((prev) => ({ ...prev, open: false })); // Close immediately

    setTimeout(() => {
      setMenuState({ open: false, type: null }); // Reset type after 1s
    }, 1000); // Delay matches CSS transition duration
  };

  if (gameStatus) {
    // Get the player's last guess (if available)
    const lastGuess =
      guessLog.length > 0 ? guessLog[guessLog.length - 1].guess : [];

    // Create arrays to track correct and misplaced icons
    let lastGuessCorrect = Array(codeLength).fill(false);
    let lastGuessInAnswer = Array(codeLength).fill(false);

    if (lastGuess.length > 0) {
      // Check for correct positions first
      lastGuess.forEach((icon, index) => {
        if (icon === hiddenAnswer[index]) {
          lastGuessCorrect[index] = true; // Mark as correct
        }
      });

      // Check for icons that exist but in the wrong position
      lastGuess.forEach((icon, index) => {
        if (!lastGuessCorrect[index] && hiddenAnswer.includes(icon)) {
          lastGuessInAnswer[index] = true; // Mark as in-answer if not correct
        }
      });
    }

    return (
      <div className="game-over">
        <h2>
          {gameStatus === "win"
            ? languages[language].gameWin
            : languages[language].gameOver}
        </h2>

        <div className="final-results">
          {/* Last Guess Section */}
          <div className="last-guess">
            <h3>{languages[language].lastGuess}</h3>
            <div className="guess-list">
              {lastGuess.length > 0 ? (
                lastGuess.map((icon, index) => (
                  <div
                    key={index}
                    className={`guess-slot ${
                      lastGuessCorrect[index]
                        ? "correct"
                        : lastGuessInAnswer[index] && difficulty !== "easy"
                        ? "in-answer"
                        : "incorrect"
                    }`}
                  >
                    <img
                      src={require(`../../Assets/Images/${theme}/${icon}.png`)}
                      alt={icon}
                      className="game-img"
                    />
                  </div>
                ))
              ) : (
                <p>No guesses were made.</p>
              )}
            </div>
          </div>

          {/* Hidden Answer Section */}
          <div className="hidden-answer">
            <h3>{languages[language].correctAnswer}</h3>
            <div className="guess-list">
              {hiddenAnswer.map((icon, index) => (
                <div key={index} className="guess-slot">
                  <img
                    src={require(`../../Assets/Images/${theme}/${icon}.png`)}
                    alt={icon}
                    className="game-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="return-home-btn"
          onClick={() => setGameState("start")}
        >
          {languages[language].returnHome}
        </button>
      </div>
    );
  }

  return (
    <div className={`game ${isAnimating ? "disabled" : ""}`}>
      <GuessLog
        closeLog={handleCloseLog}
        isLogOpen={menuState.open}
        guessHeight={guessHeight}
        guessLog={guessLog}
        difficulty={difficulty}
        theme={theme}
        type={menuState.type}
        setGameState={setGameState}
        language={language}
      />

      <div className="header">
        <div
          className="header-guesslog"
          onClick={() => setMenuState({ open: true, type: "log" })}
        >
          <FontAwesomeIcon icon={faTableList} />
        </div>

        <div className="header-difficulty">
          <p>
            {
              languages[language].difficulties[
                ["easy", "medium", "hard", "extreme", "impossible"].indexOf(
                  difficulty
                )
              ]
            }
          </p>
          <p className="small-text">{languages[language].doubleTap}</p>
        </div>

        <div
          className="header-quit"
          onClick={() => setMenuState({ open: true, type: "quit" })}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>

      <div className="icons" style={{ marginBottom: `${guessHeight + 15}px` }}>
        <div className="icon-list">
          {icons.map((icon, index) => (
            <div
              key={index}
              className={`icon ${selectedIcon === icon ? "selected" : ""} ${
                placedIcons.has(icon) ? "disabled" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (placedIcons.has(icon)) return; // Prevent action if icon is disabled
                handleIconClick(icon);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (placedIcons.has(icon)) return; // Prevent action if icon is disabled
                handleIconDoubleClick(icon);
              }}
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

      <div className="guess" ref={guessRef}>
        <div className="guess-guesses">
          <p>
            {guessesLeft} {languages[language].guessesLeft}
          </p>
        </div>
        <div className="guess-list" ref={iconRef}>
          {guess.map((icon, index) => (
            <div
              key={`${index}-${guessesLeft}`}
              className={`guess-slot ${
                selectedGuessIndex === index ? "selected-slot" : ""
              } ${isAnimating ? "isAnimating" : ""} ${
                correctPositions[index] && difficulty !== "impossible"
                  ? "correct"
                  : inAnswerPositions[index] &&
                    (difficulty === "medium" || difficulty === "hard")
                  ? "in-answer"
                  : "incorrect"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                selectedGuessIndex !== null
                  ? handleSwap(index)
                  : handleGuessClick(index);
              }}
            >
              {icon && (
                <img
                  src={require(`../../Assets/Images/${theme}/${icon}.png`)}
                  alt={icon}
                  className="game-img"
                />
              )}
            </div>
          ))}
        </div>
        {difficulty === "impossible" && (
          <div className="impossible-feedback">
            <h3>
              {languages[language].correctIconsInPlace}: {correctCount}
            </h3>
            <h3>
              {languages[language].correctIcons}: {totalCorrectIcons}
            </h3>
          </div>
        )}
        <button
          className="submit-btn"
          onClick={handleSubmitGuess}
          disabled={guess.includes(null) || gameStatus !== null}
        >
          {languages[language].submitGuess}
        </button>
      </div>
    </div>
  );
};

export default Game;
