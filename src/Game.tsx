import React, { useState } from "react";
import Board from "./Board";
import'./Game.css';

interface GameState{
  history: {
    squares: string[],
  }[],
  stepNumber: number,
  xIsNext: boolean,
  isAscending: boolean,
}

function Game(){

  const [state, setState] = useState <GameState>({
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        isAscending: true,
    })    

    const handleClick=(i: number) =>{
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = state.xIsNext ? 'X' : 'O';
        setState({
        history:history.concat([{squares: squares }]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
        isAscending: true
       });
    }

     const jumpTo=(stepNumber: number)=>{
        setState(prevState=>({
        ...prevState,
        stepNumber: stepNumber, 
        xIsNext: (stepNumber % 2) === 0,
        }
    ))
    }

     const handleSortToggle=()=> {
      setState(prevState=>({
        ...prevState,
        isAscending: !state.isAscending,
      })
      )}
    
  

    const {history, stepNumber, isAscending} = state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
  


    let moves = history.map((_, index) => {
      const desc = index ?
        'Przejdź do ruchu #' + index :
        'Przejdź na początek gry';
      const number = index +1;
    

      return (
        <li key={index}>
          {number}. 
          <button className={index === stepNumber? "boldButton" : ""} onClick={()=>jumpTo(index)}> {desc}</button>
        </li>)
    });

     if(!isAscending) {
      moves.reverse();
    }
    
    let status;
    if (winner) {
      status = 'Wygrywa: ' + winner.name;
    } 
    else if (state.stepNumber === 9) {
      status = 'Brak możliwości ruchu!'
    }
      else {
      status = 'Następny gracz:  ' + (state.xIsNext ? 'X' : 'O');
    }
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i) => handleClick(i)} winner={winner}/>
          </div>
          <div className="game-info">
            <div >{status}</div>
            <button className="sort" onClick={()=>handleSortToggle()}>{isAscending ? 'Sortuj malejąco' : 'Sortuj rosnąco'}</button>
            <ul>{moves}</ul>
          </div>
        </div>
      )
    }
  

  function calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return  {
          name: squares[a],
          line: lines[i],
      };
    }
  }
    return  null
  }


  

  export default Game;