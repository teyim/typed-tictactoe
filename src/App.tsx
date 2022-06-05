import { useState } from 'react'
import Board from './board'
import { calculateWinner } from './helper'
import Square from './square'
import { squareType } from './types'
import { History } from './types'
function App() {
  const initialHistory: History[] = [
    {
      squares: Array(9).fill(null)
    }
  ]
  const [showPlayerSelection, setShowPlayerSelection] = useState(true)
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, setxIsNext] = useState(true)
  const [history, setHistory] = useState<History[]>(initialHistory)

  const playerSelectHandler = (player: squareType) => {
    if (player === 'X') {
      setxIsNext(true);
      setShowPlayerSelection(false)
    }
    else {
      setxIsNext(false);
      setShowPlayerSelection(false)
    }
  }

  const handleSquareCick = (i: number): void => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
       return;
     }
     squares[i]=xIsNext? 'X' : 'O' ;
     setHistory(newHistory.concat([{squares:squares}]))
     setStepNumber(newHistory.length)
     setxIsNext(!xIsNext);
     setShowPlayerSelection(false);
  }

  const jumpTo=(step:number):void=>{
    setStepNumber(step);
    setxIsNext((step%2)===0)
  }

  const current = history[stepNumber];
  const winner=calculateWinner(current.squares);
  let isStepLeft=true

  const moves=history.map((step,move)=>{
         isStepLeft=step.squares.some(square=>square===null);
         const desc=move?
         'Go to move #' + move :
         'Go to game start';
         return(
           <li key={move}>
             <button onClick={()=>jumpTo(move)}>{desc}</button>
           </li>
         )
  })

  let status;
if (winner) {
  status="Winner:"+winner;
}
else if (isStepLeft) {
  status='Next Player:'+(xIsNext?'X':'O');
}
else{
  status='nobody won :(';
}

  return (
    <>
      <div className="game">
        {showPlayerSelection && <div className="players">
          <button onClick={() => playerSelectHandler('X')}>Player X</button>
          <button onClick={() => playerSelectHandler('O')}>Player O</button>
        </div>}
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => handleSquareCick(i)} />
        </div>
       <div className="game-info">
                <div>{status}</div>
                {(winner || !isStepLeft) && <button onClick={() => {
                    jumpTo(0);
                    setHistory(initialHistory);
                    setShowPlayerSelection(true);
                }}>Start new game</button>}
                <ol>{moves}</ol>
            </div>
        </div>
    </>
  )
}

export default App
