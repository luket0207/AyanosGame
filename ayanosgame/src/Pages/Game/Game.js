import "./Game.scss";
import React, { useState, useEffect, useRef } from "react";
import { imageSets } from "../../Assets/Images/ImageSets"; // Import image sets

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Game = ({
  codeLength = 6,
  imageSet = "pokemon",
  difficulty = "easy",
  setGameState,
}) => {
  let maxGuesses;
  switch (difficulty) {
    case "easy":
      maxGuesses = Math.ceil(codeLength / 2) + 1;
      break;
    case "medium":
      maxGuesses = codeLength - 1;
      break;
    case "hard":
      maxGuesses = Math.floor(codeLength + codeLength / 2);
      break;
    case "extreme":
      maxGuesses = codeLength + codeLength;
      break;
    case "impossible":
      maxGuesses = codeLength + (codeLength + Math.floor(codeLength / 2));
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

  const iconRef = useRef(null);

  useEffect(() => {
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

    const imageList = imageSets[imageSet] || imageSets["pokemon"];
    const shuffledImages = shuffleArray(imageList).slice(0, codeLength + 4);
    setIcons(shuffledImages);

    const answer = shuffleArray([...shuffledImages]).slice(0, codeLength);
    setHiddenAnswer(answer);

    console.log(`Hidden Answer [${difficulty.toUpperCase()}]:`, answer);
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

  const placedIcons = new Set(guess.filter((icon) => icon !== null));

  const handleIconClick = (icon) => {
    if (!placedIcons.has(icon)) {
      setSelectedIcon(icon);
      setSelectedGuessIndex(null);
    }
  };

  const handleGuessClick = (index) => {
    if (selectedIcon) {
      const newGuess = [...guess];
      if (newGuess[index]) {
        const oldIcon = newGuess[index];
        setIcons((prevIcons) =>
          prevIcons.includes(oldIcon) ? prevIcons : [...prevIcons, oldIcon]
        );
      }

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
      newGuess[index] = newGuess[selectedGuessIndex];
      newGuess[selectedGuessIndex] = null;
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
    setCorrectCount(correct); // Store number of correct positions
    setTotalCorrectIcons(totalCorrect); // Store number of correct icons (position-independent)

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

  if (gameStatus) {
    return (
      <div className="game-over">
        <h2>{gameStatus === "win" ? "You Win! 🎉" : "Game Over 😢"}</h2>
        <div className="hidden-answer">
          <h3>Hidden Answer:</h3>
          <div className="answer-list">
            {hiddenAnswer.map((icon, index) => (
              <img
                key={index}
                src={require(`../../Assets/Images/Pokemon/${icon}`)}
                alt={icon}
                className="game-img"
              />
            ))}
          </div>
        </div>
        <button
          className="return-home-btn"
          onClick={() => setGameState("start")}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className={`game ${isAnimating ? "disabled" : ""}`}>
      <p>Difficulty: {difficulty}</p>
      <p>Guesses Left: {guessesLeft}</p>

      <div className="icons">
        <h3>Icons</h3>
        <div className="icon-list">
          {icons.map((icon, index) => (
            <img
              key={index}
              src={require(`../../Assets/Images/Pokemon/${icon}`)}
              alt={icon}
              className={`game-img ${
                selectedIcon === icon ? "selected" : ""
              }`}
              onClick={() => handleIconClick(icon)}
            />
          ))}
        </div>
      </div>

      <div className="guess" ref={iconRef}>
        <h3>Guess</h3>
        <div className="guess-list">
          {guess.map((icon, index) => (
            <div
              key={`${index}-${guessesLeft}`} // Ensures re-render on each new guess
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
              {icon && <img src={require(`../../Assets/Images/Pokemon/${icon}`)} alt={icon} className="game-img" />}
            </div>
          ))}
        </div>
      </div>

      {difficulty === "impossible" && (
        <div>
          <h3>Correct Icons in Right Place: {correctCount}</h3>
          <h3>Correct Icons: {totalCorrectIcons}</h3>
        </div>
      )}

      <button
        className="submit-btn"
        onClick={handleSubmitGuess}
        disabled={guess.includes(null) || gameStatus !== null}
      >
        Submit Guess
      </button>
    </div>
  );
};

export default Game;
