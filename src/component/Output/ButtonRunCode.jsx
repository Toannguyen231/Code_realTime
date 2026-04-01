import React from "react";
import "./ButtonRunCode.scss";
const ButtonRunCode = ({ onClick }) => {
    return (
        <button className="btnRunCode"
            onClick={onClick}
        >Run</button>
    );
};

export default ButtonRunCode;