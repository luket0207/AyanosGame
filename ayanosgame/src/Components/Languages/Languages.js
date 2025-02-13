const languages = {
    en: {
      title: "AYANO's GAME",
      settings: "Settings",
      howToPlay: "How To Play",
      selectDifficulty: "Select Difficulty",
      selectIcons: "Select How Many Icons",
      difficulty: "Difficulty",
      themes: ["Pokemon", "Dogs", "One Piece"],
      difficulties: ["Easy", "Medium", "Hard", "Extreme", "Impossible"],
      
      instructions: {
        theGame: "The Game",
        gameDesc: "It's basically Wordle but with pictures and not letters.",
        aim: "The aim of the game is to move all the icons into the correct order in your guess slots at the bottom of the screen.",
        orderChanges: "Each new game the order will be different, it is up to you to take guesses and use the clues to get closer to the correct answer.",
  
        setup: "Set Up",
        setupDesc: "Select a difficulty and then the amount of icons you want to play the game with.",
        themeChange: "You can change the theme on the start screen, but not in the game.",
  
        gameplay: "Gameplay",
        moveIcons: "To move icons, click an icon first to select it, then click a slot in the bottom slots to place the icon in it.",
        doubleClick: "You can double-click an icon to put it into the next empty slot.",
        swapItems: "You can swap items as much as you like before guessing.",
        previousGuesses: "You can see your previous guesses by clicking on the ? in the header.",
  
        difficulties: "Difficulties",
        easy: "Easy - There are the same amount of slots as icons, so you just have to guess the order.",
        medium: "Medium - There are more icons than slots. So an icon you guess may not be in the final answer. If an icon is in the answer, but not in the correct position, it will display in yellow.",
        hard: "Hard - Same as Medium but there are even more icons.",
        extreme: "Extreme - Same as Hard but it doesn't tell you if an icon is correct unless it is in the exact correct position. So it will not mark icons with yellow anymore.",
        impossible: "Impossible - You get no feedback to tell you which icons were correct. You only get told how many you got right and how many of them are in the right position.",
      },
  
      gameWin: "You Win! 🎉",
      gameOver: "Game Over 😢",
      lastGuess: "Your Last Guess:",
      correctAnswer: "Correct Answer:",
      returnHome: "Return to Home",
      doubleTap: "Double Tap To Auto Select",
      guessesLeft: "Guesses Left",
      correctIconsInPlace: "Correct Icons in Right Place",
      correctIcons: "Correct Icons",
      submitGuess: "Submit Guess",
  
      // Guess Log
      guessLog: "Guess Log",
      noGuesses: "Guesses will appear here after you make them",
      guess: "Guess",
      confirmQuit: "Are you sure you want to quit?",
      yes: "Yes",
      no: "No"
    },
  
    jp: {
      title: "あやちゃんのゲーム",
      settings: "設定",
      howToPlay: "遊び方",
      selectDifficulty: "難易度を選択",
      selectIcons: "アイコンの数を選択",
      difficulty: "難易度",
      themes: ["ポケモン", "犬", "ワンピース"],
      difficulties: ["初級", "中級", "上級 ", "超級", "鬼ムズ"],
  
      instructions: {
        theGame: "ゲームの概要",
        gameDesc: "これはWordleに似ていますが、文字ではなく画像を使います。",
        aim: "このゲームの目的は、すべてのアイコンを正しい順序に並べることです。",
        orderChanges: "各ゲームでアイコンの順序が異なります。推測してヒントを活用し、正解に近づきましょう。",
  
        setup: "ゲームを始める前に…",
        setupDesc: "難易度と回答枠の数を選択してください。",
        themeChange: "ゲーム中にテーマ変更はできません。",
  
        gameplay: "操作方法",
        moveIcons: "アイコンをクリックして選択し、下部のスロットに配置します。",
        doubleClick: "また、移動したいアイコンをダブルクリックする事で、スロットに移すことが出来ます。",
        swapItems: "解答前であれば、何度でも並び替えることが出来ます。",
        previousGuesses: "ヘッダー左のアイコンをクリックすると、解答の履歴を確認することが出来ます。",
  
        difficulties: "難易度について",
        easy: "初級 - アイコンの数とスロットの数が同じなので、順番を推測するだけです。",
        medium: "中級 - スロット数よりアイコンが多く出てきます。選択したアイコンが合っていて、位置が違う場合は黄色で表示されます。※アイコンも場所もあってる場合は緑に表示されます。",
        hard: "上級 - 中級より更にアイコンの選択肢が多いです。",
        extreme: "超級 - 上級と同じですが、黄色表示が無くなります。",
        impossible: "鬼ムズ - 緑表示も無くなります。ヒントは選択したアイコンが解答の中にいくつあるか、アイコンも位置も合っているのはいくつあるか、が数字で表示されるだけです。どのアイコンが正解かは分かりません。",
      },
  
      gameWin: "勝利！🎉",
      gameOver: "ゲームオーバー 😢",
      lastGuess: "あなたの最後の推測:",
      correctAnswer: "正解:",
      returnHome: "ホーム",
      doubleTap: "ダブルタップして自動選択",
      guessesLeft: "残りの試行数",
      correctIconsInPlace: "正しい位置にあるアイコン",
      correctIcons: "正しいアイコン",
      submitGuess: "推測を送信",
  
      // Guess Log
      guessLog: "推測ログ",
      noGuesses: "推測はここに表示されます",
      guess: "推測",
      confirmQuit: "本当に終了しますか？",
      yes: "はい",
      no: "いいえ"
    }
  };
  
  export default languages;
  