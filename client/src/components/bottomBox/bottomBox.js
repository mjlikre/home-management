import React from "react"; 

const BottomBox = props => {
return <div className = {props.class} data = {props.data}>{props.children}</div>
}

export default BottomBox