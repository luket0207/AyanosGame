import "./Start.scss";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faTimes,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import languages from "../../Components/Languages/Languages";

const Start = ({
  setGameState,
  setGameConfig,
  setTheme,
  theme,
  language,
  setLanguage,
}) => {
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

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "jp" : "en"));
  };

  return (
    <div className="start">
      <h1>{languages[language].title}</h1>

      {!difficulty ? (
        <>
          {/* Theme Selection */}
          <h3 className="theme-text">{languages[language].settings}</h3>
          <div className="theme-buttons">
            {["Pokemon", "Dogs", "OnePiece"].map((t, index) => (
              <div
                key={t}
                className={`theme-option ${theme === t ? "active" : ""}`}
                onClick={() => setTheme(t)}
              >
                <img
                  src={require(`../../Assets/Images/${t}/${
                    t === "Pokemon"
                      ? "pikachu"
                      : t === "Dogs"
                      ? "dog5"
                      : "op-logo"
                  }.png`)}
                  alt={languages[language].themes[index]}
                  className="game-img"
                />
              </div>
            ))}
          </div>
          {/* Language Toggle Button */}
          <button className="language-toggle" onClick={toggleLanguage}>
            <FontAwesomeIcon icon={faGlobe} />{" "}
            {language === "en" ? "日本語" : "EN"}
          </button>
          {/* How To Play - Accordion */}
          <button
            ref={titleRef}
            className="accordion-title"
            onClick={toggleHowToPlay}
          >
            {languages[language].howToPlay}
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
            <h3>{languages[language].instructions.theGame}</h3>
            <p>{languages[language].instructions.gameDesc}</p>
            <p>{languages[language].instructions.aim}</p>
            <p>{languages[language].instructions.orderChanges}</p>

            <h3>{languages[language].instructions.setup}</h3>
            <p>{languages[language].instructions.setupDesc}</p>
            <p>{languages[language].instructions.themeChange}</p>

            <h3>{languages[language].instructions.gameplay}</h3>
            <p>{languages[language].instructions.moveIcons}</p>
            <p>{languages[language].instructions.doubleClick}</p>
            <p>{languages[language].instructions.swapItems}</p>
            <p>{languages[language].instructions.previousGuesses}</p>

            <h3>{languages[language].instructions.difficulties}</h3>
            <p>
              <strong>{languages[language].difficulties[0]}</strong> -{" "}
              {languages[language].instructions.easy}
            </p>
            <p>
              <strong>{languages[language].difficulties[1]}</strong> -{" "}
              {languages[language].instructions.medium}
            </p>
            <p>
              <strong>{languages[language].difficulties[2]}</strong> -{" "}
              {languages[language].instructions.hard}
            </p>
            <p>
              <strong>{languages[language].difficulties[3]}</strong> -{" "}
              {languages[language].instructions.extreme}
            </p>
            <p>
              <strong>{languages[language].difficulties[4]}</strong> -{" "}
              {languages[language].instructions.impossible}
            </p>
          </div>

          {/* Select Difficulty */}
          <h3>{languages[language].selectDifficulty}</h3>
          <div className="difficulty-buttons">
            {["easy", "medium", "hard", "extreme", "impossible"].map(
              (level, index) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className="difficulty-option"
                >
                  {languages[language].difficulties[index]}
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
              {languages[language].difficulty}:{" "}
              {
                languages[language].difficulties[
                  ["easy", "medium", "hard", "extreme", "impossible"].indexOf(
                    difficulty
                  )
                ]
              }
            </h4>
            <FontAwesomeIcon
              icon={faTimes}
              className="reset-icon"
              onClick={() => setDifficulty(null)}
            />
          </div>

          {/* Select Code Length */}
          <h3>{languages[language].selectIcons}</h3>
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
