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
  const [playerNameX, setPlayerNameX] = useState("");
  const [playerNameO, setPlayerNameO] = useState("");
  const [isBoardHasEmptySquare, setBoardHasEmptySquare] = useState(true);

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

    checkResult(boardClone);

    setXisNext(true);
    setIsComputerTurn(false);
  };

  const checkResult = (boardClone) => {
    if (isBoardHasEmptySquare) {
      const newWinner = calculateWinner(boardClone);
      if (newWinner) {
        if (newWinner === "X") {
          setXWins(xWins + 1);
        } else {
          setOWins(oWins + 1);
        }
      } else if (!boardClone.includes(null)) {
        setTies(ties + 1);
        setBoardHasEmptySquare(false);
      }
    }
  }

  const handleBackButtonClick = () => {
    setGameInProgress(false);
    setInGame(false);
    setIsPlayAgainstComputerVisible(true);
    setIsPlayWithFriendVisible(true);
    setIsNewGameComputerVisible(false);
    setIsNewGameFriendVisible(false);
    setPlayerName("");
    setPlayerNameO("");
    setPlayerNameX("");
    setXWins(0);
    setOWins(0);
    setTies(0);
    setBoard(Array(9).fill(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // either singleplayer or multiplayer
    if(playerName || (playerNameX && playerNameO)) {
      setGameInProgress(true);
    }
  };

  const handleClick = (i) => {
    if (gameInProgress) {
      const boardClone = [...board];
      if (winner || boardClone[i]) return;
    
      boardClone[i] = xIsNext ? "X" : "O";
      setBoard(boardClone);
      setXisNext(!xIsNext);
    
      checkResult(boardClone);
    
      setIsComputerTurn(true);
      
    }
  };

  useEffect(() => {
    if (!xIsNext && isPlayingAgainstComputer && !winner && gameInProgress) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, isPlayingAgainstComputer, winner, board]);

  const handlePlayAgainstComputerClick = () => {
    setBoardHasEmptySquare(true);
    setIsPlayingAgainstComputer(true);
    setIsNewGameComputerVisible(true);
    setIsPlayAgainstComputerVisible(false);
    setIsPlayWithFriendVisible(false);
    setShowStartMessage(false); // Hide the start message
    if (!playerName) {
      setPlayerName(""); // Clear the player's name
    }
    setBoard(Array(9).fill(null));
    setXisNext(true);
    setInGame(true); 
  };

  const handlePlayWithFriendClick = () => {
    setBoardHasEmptySquare(true);
    setIsNewGameFriendVisible(true);
    setShowStartMessage(true);
    setIsPlayingAgainstComputer(false);
    setIsPlayAgainstComputerVisible(false);
    setIsPlayWithFriendVisible(false);
    setBoard(Array(9).fill(null));
    setXisNext(true);
    setInGame(true); 
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
            <form onSubmit={handleSubmit}>
      
          {!gameInProgress && (<input 
            type="text"
            placeholder="Enter O's name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />)}
          {!gameInProgress && (<button type="submit">Submit</button>)}
          </form>
          )}
        </div>
          <div className="counter">
            <p>{playerName}(X): {xWins}   ||   Tie: {ties}   ||    Computer(O): {oWins}</p>
          </div>
          <p className="start-message">Let's play!</p>
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
          <div className="name-input">
          { setPlayerNameO && setPlayerNameX && (
            <form onSubmit={handleSubmit}>
          {!gameInProgress && (<input 
            type="text"
            placeholder="Enter X's name"
            value={playerNameX}
            onChange={(e) => setPlayerNameX(e.target.value)}
            />)}
          {!gameInProgress && (<input 
            type="text"
            placeholder="Enter O's name"
            value={playerNameO}
            onChange={(e) => setPlayerNameO(e.target.value)}
          />)}
          {!gameInProgress && (<button type="submit">Submit</button>)}
        
          </form>
      )}  
        </div>

        <div className="counter">
          <p>{playerNameX}(X): {xWins}   ||   Tie: {ties}   ||    {playerNameO}(O): {oWins}</p>
        </div>

          <p className="start-message">Let's play!</p>
          <button className="button" onClick={handlePlayWithFriendClick}>
            New Game
          </button>
        </div>
        
      )}
      {inGame && (
        <button className="button" onClick={() => handleBackButtonClick()}>
         Back to Main Menu
        </button>
)}
    </div>

  );

};

export default Game;