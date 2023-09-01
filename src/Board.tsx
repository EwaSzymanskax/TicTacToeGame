import React from "react";
import Square from "./Square"
import uuid from 'react-uuid';

type Props={
  winner: {
    name: any,
    line: number[],
  } | null,
  squares: string[],
  onClick: (i: number)=> void,
  

}

function Board({winner, squares, onClick}: Props){
  console.log(squares)
 
 const isWinnerSquare=(i: number): boolean=> {
    if(winner && winner.line.findIndex(el => el === i) !== -1) {
      return true;
    }
    return false;
}
  const renderSquare=(i: number): JSX.Element=>{
     return (
      <Square
        value={squares[i]} 
        onClick={() => onClick(i)}
        key={uuid()}
        winner={isWinnerSquare(i)}
      />
    );
   

  }

    const boardSize = 3;
    let squaresArr: JSX.Element[] =[];
    for(let i = 0; i < boardSize; i++) {
      let row: JSX.Element[] = [];
      for( let j = 0; j < boardSize; j++) {
        row.push(renderSquare(i * boardSize + j));
      }
      squaresArr.push(<div key={uuid()} className="board-row">{row}</div>)
    }

    return (
      <div>{squaresArr}</div>
     );
      
}

export default Board;