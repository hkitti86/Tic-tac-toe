import React from "react"
import "./styles.css"

const Square = ({value, onClick}) => (
    <button className="cell-face" onClick={onClick}>
        {value}
    </button>
)

export default Square;