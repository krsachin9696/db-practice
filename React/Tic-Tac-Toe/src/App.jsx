import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from './winning-combination.js';
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currectPlayer = 'X';
      
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currectPlayer = 'O';
  }
   
  return currectPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare =(rowIndex, colIndex)=> {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      const currectPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex }, player: currectPlayer },
        ...prevTurns];

      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
            <Player initialName="player 1" symbol="X" isActive={activePlayer === 'X'}/>
            <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
