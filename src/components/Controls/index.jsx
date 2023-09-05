import './controls.scss'

export function Controls({
  activePlayer,
  undoMove,
  resetGame,
  winOrDraw
}) {
  return(
    <div className="flex controlsContainer">
      { !winOrDraw &&  <><div className="activePlayer">Active Player: {activePlayer}</div>
        <button onClick={undoMove}>Undo Moves</button></>
      }
      <button onClick={resetGame}>{!winOrDraw ? 'Reset Game' : 'Restart Game'}</button>
    </div>
  )
}