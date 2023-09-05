import './square.scss'

export default function Square({ value, onClickTrigger}) {
  return (
    <div data-testid="square" className="squareContainer" onClick={() => onClickTrigger()}>
      {value}
    </div>
  )
}