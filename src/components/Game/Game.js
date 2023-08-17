import React, { useEffect, useState } from "react";
import { calculateWinner } from "../../helpers";
import Board from "../Board/Board";
import "./styles.css";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [isPlayingAgainstComputer, setIsPlayingAgainstComputer] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [isPlayAgainstComputerVisible, setIsPlayAgainstComputerVisible] = useState(true);
  const [isPlayWithFriendVisible, setIsPlayWithFriendVisible] = useState(true);
  const [isNewGameComputerVisible, setIsNewGameComputerVisible] = useState(false);
  const [isNewGameFriendVisible, setIsNewGameFriendVisible] = useState(false);
  const [showStartMessage, setShowStartMessage] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [ties, setTies] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [gameInProgress, setGameInProgress] = useState(false); 
  const [inGame, setInGame] = useState(false);



  const winner = calculateWinner(board);

  const makeComputerMove = () => {
    const emptySquares = board.reduce(
      (acc, currentSquare, index) =>
        currentSquare === null ? [...acc, index] : acc,
      []
    );

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const computerMove = emptySquares[randomIndex];

    const boardClone = [...board];
    boardClone[computerMove] = "O";
    setBoard(boardClone);
    setXisNext(true);
    setIsComputerTurn(false);
  };

  const handleBackButtonClick = () => {
    setGameInProgress(false);
    setIsPlayAgainstComputerVisible(true);
    setIsPlayWithFriendVisible(true);
    setIsNewGameComputerVisible(false);
    setIsNewGameFriendVisible(false);
    setPlayerName("");
    setBoard(Array(9).fill(null));
    setInGame(false); // Add this line
  };

  const handleClick = (i) => {
    const boardClone = [...board];
    if (winner || boardClone[i]) return;
  
    boardClone[i] = xIsNext ? "X" : "O";
    setBoard(boardClone);
    setXisNext(!xIsNext);
  
    const newWinner = calculateWinner(boardClone);
    if (newWinner) {
      if (newWinner === "X") {
        setXWins(xWins + 1);
      } else {
        setOWins(oWins + 1);
      }
    } else if (!boardClone.includes(null)) {
      setTies(ties + 1);
    }
  
    setIsComputerTurn(true);
  };

  useEffect(() => {
    if (!xIsNext && isPlayingAgainstComputer && !winner) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, isPlayingAgainstComputer, winner, board]);

  const handlePlayAgainstComputerClick = () => {
    setIsPlayingAgainstComputer(true);
    setIsNewGameComputerVisible(true);
    setIsPlayAgainstComputerVisible(false);
    setIsPlayWithFriendVisible(false);
    setShowStartMessage(false); // Hide the start message
    setGameInProgress(true);
    // Only set the player's name if it's not already set
    if (!playerName) {
      setPlayerName(""); // Clear the player's name
    }
    setBoard(Array(9).fill(null));
    setXisNext(true);
    setInGame(true); 
  };
  
  

  const handlePlayWithFriendClick = () => {
    setIsNewGameFriendVisible(true);
    setShowStartMessage(true);
    setIsPlayingAgainstComputer(false);
    setIsPlayAgainstComputerVisible(false);
    setIsPlayWithFriendVisible(false);
    setBoard(Array(9).fill(null));
    setXisNext(true);
  };


  return (
    <div className="game-container">
      <Board squares={board} onClick={handleClick} />
      {isPlayAgainstComputerVisible && (
        <div>
          <button className="button" onClick={handlePlayAgainstComputerClick}>
            Play against Computer
          </button>
        </div>
      )}
      {isNewGameComputerVisible && (
        <div className="againstComputer-version">
          <div className="name-input">
            { setPlayerName && (
            <input 
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
          />)}
        </div>
          <div className="counter">
            <p>{playerName}(X): {xWins} || Tie: {ties} || Computer(O): {oWins}</p>
          </div>
          <p className="start-message">Click on a cell to start the game!</p>
          <button className="button" onClick={handlePlayAgainstComputerClick}>
            New Game
          </button>
        </div>
      )}
      {isPlayWithFriendVisible && (
        <button className="button" onClick={handlePlayWithFriendClick}>
          Play against Friend
        </button>
      )}
      {isNewGameFriendVisible && (
        <div className="againstFriend-version">
          <div className="counter">
          <p>Player(X): {xWins} || Tie: {ties} || Computer(O): {oWins}</p>
          </div>
          <p className="start-message">Click on a cell to start the game!</p>
        </div>
      )}
      {inGame && (
        <button className="button" onClick={() => setInGame(false)}>
         Back to Main Menu
        </button>
)}
    </div>

  );
  <div>
    <button className="button" onClick={handlePlayWithFriendClick}>
            New Game
    </button>
  </div>
};

export default Game;