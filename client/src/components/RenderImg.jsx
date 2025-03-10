import React from "react";

function RenderImg(props){
    return (
        <img src={props.src} alt={props.alt} />
    );
}

export default RenderImg;