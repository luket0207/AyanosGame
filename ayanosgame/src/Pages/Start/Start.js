import "./Start.scss";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";

const Start = ({ setGameState, setGameConfig, setTheme, theme }) => {
  const [difficulty, setDifficulty] = useState(null);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const accordionRef = useRef(null);
  const titleRef = useRef(null);
  const [accordionHeight, setAccordionHeight] = useState("0px");

  useEffect(() => {
    if (accordionRef.current) {
      setAccordionHeight(
        isHowToPlayOpen ? `${accordionRef.current.scrollHeight}px` : "0px"
      );
    }
  }, [isHowToPlayOpen]);

  const toggleHowToPlay = () => {
    const newOpenState = !isHowToPlayOpen;
    setIsHowToPlayOpen(newOpenState);

    if (newOpenState) {
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }
  };

  const handleStart = (codeLength) => {
    if (difficulty) {
      setGameConfig({ codeLength, difficulty });
      setGameState("game");
    }
  };

  return (
    <div className="start">
      <h1>AYANO's GAME</h1>

      {!difficulty ? (
        <>
          {/* Theme Selection */}
          <h3>Select Theme</h3>
          <div className="theme-buttons">
            <div
              className={`theme-option ${theme === "Pokemon" ? "active" : ""}`}
              onClick={() => setTheme("Pokemon")}
            >
              <img
                src={require(`../../Assets/Images/Pokemon/pikachu.png`)}
                alt={"Pokemon"}
                className="game-img"
              />
            </div>
            <div
              className={`theme-option ${theme === "Dogs" ? "active" : ""}`}
              onClick={() => setTheme("Dogs")}
            >
              <img
                src={require(`../../Assets/Images/Dogs/dog5.png`)}
                alt={"Dogs"}
                className="game-img"
              />
            </div>
            <div
              className={`theme-option ${theme === "OnePiece" ? "active" : ""}`}
              onClick={() => setTheme("OnePiece")}
            >
              <img
                src={require(`../../Assets/Images/OnePiece/op-logo.png`)}
                alt={"Dogs"}
                className="game-img"
              />
            </div>
          </div>
          {/* How To Play - Accordion */}
          <button
            ref={titleRef}
            className="accordion-title"
            onClick={toggleHowToPlay}
          >
            How To Play
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`chevron-icon ${isHowToPlayOpen ? "rotate" : ""}`}
            />
          </button>
          <div
            ref={accordionRef}
            className="accordion-content"
            style={{ maxHeight: accordionHeight }}
          >
            <h3>Set Up</h3>
            <p>
              Select a difficulty and then the amount of icons you want to play
              the game with.
            </p>
            <p>
              You can change the theme on the start screen, but not in the game.
            </p>
            <h3>Gameplay</h3>
            <p>
              To move icons, click an icon first to select it, then click a slot
              in the bottom slots to place the icon in it.
            </p>
            <p>
              You can double-click an icon to put it into the next empty slot.
            </p>
            <p>You can swap items as much as you like before guessing.</p>
            <p>
              You can see your previous guesses by clicking on the ? in the
              header.
            </p>
            <h3>Difficulties</h3>
            <p>
              <strong>Easy</strong> - There are the same amount of slots as
              icons, so you just have to guess the order.
            </p>
            <p>
              <strong>Medium</strong> - There are more icons than slots. So an
              icon you guess may not be in the final answer. If an icon is in
              the answer, but not in the correct position, it will display in
              yellow.
            </p>
            <p>
              <strong>Hard</strong> - Same as Medium but there are even more
              icons.
            </p>
            <p>
              <strong>Extreme</strong> - Same as Hard but it doesn't tell you if
              an icon is correct unless it is in the exact correct position. So
              it will not mark icons with yellow anymore.
            </p>
            <p>
              <strong>Impossible</strong> - You get no feedback to tell you
              which icons were correct. You only get told how many you got right
              and how many of them are in the right position.
            </p>
          </div>

          {/* Select Difficulty */}
          <h3>Select Difficulty</h3>
          <div className="difficulty-buttons">
            {["easy", "medium", "hard", "extreme", "impossible"].map(
              (level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className="difficulty-option"
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <>
          {/* Selected Difficulty */}
          <div className="selected-difficulty">
            <h4>
              Difficulty:{" "}
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </h4>
            <FontAwesomeIcon
              icon={faTimes}
              className="reset-icon"
              onClick={() => setDifficulty(null)}
            />
          </div>

          {/* Select Code Length */}
          <h3>Select How Many Icons</h3>
          <div className="code-length-buttons">
            {[5, 6, 7, 8, 9, 10].map((length) => (
              <button key={length} onClick={() => handleStart(length)}>
                {length}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Start;
