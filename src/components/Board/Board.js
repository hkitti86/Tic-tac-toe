import React from "react";
import Square from "../Square/Square";
import "./styles.css";

const Board = ({squares, onClick}) => (
<div className="game-field" >
    {squares.map((square, i) => (
       <Square key={i} value={square} onClick={() => onClick(i)}/> 
    ))}   
</div>
)

export default Board;