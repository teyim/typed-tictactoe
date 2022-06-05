import { squareType } from './types'

interface SquareProps {
  value: squareType
  onClick: () => void;
}

function Square({ onClick, value }: SquareProps) {
  return (
    <button className='square' onClick={onClick}>
      {value}
    </button>
  )
}

export default Square