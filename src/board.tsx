import { ReactNode } from "react"
import Square from "./square"
import { squareType } from './types'

interface BoardProps {
  squares: squareType[];
  onClick: (id: number) => void;
}
function Board({ squares, onClick }: BoardProps) {
  const renderSquare = (i: number): ReactNode => {
    return (
      <Square value={squares[i]} onClick={() => onClick(i)} />
    )
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board