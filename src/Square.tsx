import React from "react";

type Props={
  onClick: ()=>void;
  winner:  boolean;
  value: string;
}


function Square({ onClick, winner, value }: Props) {
    return (
      <button className={winner ? 'square color' : 'square'}  onClick={onClick}>
        {value}
        </button>
    );
  
}

export default Square;
