import './square.scss'

export function Square({ value, onClickTrigger}) {
  return (
    <div data-testid="square" className="squareContainer" onClick={() => onClickTrigger()}>
      {value}
    </div>
  )
}