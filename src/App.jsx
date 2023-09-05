import { useState } from "react";
import './App.scss';

import { Controls } from "./components/Controls";
import { Square } from "./components/Square";

const INITIAL_FIELD_VAL = ['', '', '', '', '', '', '', '', ''];
const INITIAL_PLAYER = 'X';

function App() {
  const [field, setField] = useState(INITIAL_FIELD_VAL);
  const [activePlayer, setActivePlayer] = useState(INITIAL_PLAYER);
  const [moves, setMoves] = useState([]);
  const [ winner, setWinner] = useState('');
  const [draw,setDraw] = useState(false);

  function undoMove() {
    if(moves.length === 0) return
    let movesSubset = [...moves];
   setField(movesSubset.pop());
   setMoves(movesSubset);
   setActivePlayer((prevActivePlayer) => prevActivePlayer === 'X' ? 'O': 'X');
  }

  function resetGame() {
    setField(INITIAL_FIELD_VAL);
    setActivePlayer(INITIAL_PLAYER);
    setMoves([]);
    setWinner('');
    setDraw(false);
  }

  function onChangeFieldVals(idx) {
    if(field[idx] !== '' || winner) return
    let newField = [...field];
    newField[idx] = activePlayer;
    setField(newField);
    setMoves(prevState => {
      let move = [...prevState];
      move.push(field)
      return move
    });
    const isWinner = checkWinner(newField);
    if (isWinner) {
      setWinner(isWinner);
    }
    setActivePlayer((prevActivePlayer) => prevActivePlayer === 'X' ? 'O': 'X');
  }

  function checkWinner(currField) {
    const winnerScenarios = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(let i = 0; i< winnerScenarios.length; i++) {
      const [pos1, pos2, pos3] = winnerScenarios[i]
      if(currField[pos1] !== '' && currField[pos1] === currField[pos2] && currField[pos1] === currField[pos3]) {
        setWinner(currField[pos1])
        return currField[pos1]
      }
    }
    !currField.includes("") && setDraw(true)
    return false
  }

  return (
    <div className="App flex center-flex flex-column">
      <Controls 
        undoMove={undoMove} 
        resetGame={resetGame} 
        activePlayer={activePlayer} 
        winOrDraw={Boolean(winner) || draw}
      />
      { winner && <div className="matchEndTxt">Winning Player: {winner}</div>}
      { draw && <div className="matchEndTxt">Sheesh! its a draw</div> }
      <div className="flex center-flex flex-column">
        <div className="flex row">
          <Square value={field[0]} onClickTrigger= {() => { onChangeFieldVals(0)}}/>
          <Square value={field[1]} onClickTrigger= {() => { onChangeFieldVals(1)}}/>
          <Square value={field[2]} onClickTrigger= {() => { onChangeFieldVals(2)}}/>
        </div>
        <div className="flex">
          <Square value={field[3]} onClickTrigger= {() => { onChangeFieldVals(3)}}/>
          <Square value={field[4]} onClickTrigger= {() => { onChangeFieldVals(4)}}/>
          <Square value={field[5]} onClickTrigger= {() => { onChangeFieldVals(5)}}/>
        </div>
        <div className="flex">
          <Square value={field[6]} onClickTrigger= {() => { onChangeFieldVals(6)}}/>
          <Square value={field[7]} onClickTrigger= {() => { onChangeFieldVals(7)}}/>
          <Square value={field[8]} onClickTrigger= {() => { onChangeFieldVals(8)}}/>
        </div>
      </div>
    </div>
  );
}

export default App;
