import React from "react";

function Button(props){
    function clicked(){


    }
    return (
        <button onClick={clicked}>{props.content}</button>
    );
}

export default Button;