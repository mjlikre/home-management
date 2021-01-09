import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputArea = props => {
    if (props.type === "normal") {
        return (
            <div className="col-md-2">
                <label className="col-md-12">{props.label}</label>
                <input
                className="col-md-12 kjga-input-box"
                type="number"
                autoComplete="off"
                value={props.amount}
                onChange={props.change}
                />
            </div>
        )
    }else if (props.type === "date") {
        return (
            <div className="col-md-2">
                <label className="col-md-12">{props.label}</label>
                <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={props.date}
                onChange={(date) => {
                    console.log(date)
                }}
                className="kjga-input-box"
                />
            </div>
        )
    } else if (props.type === "inventory"){
        return(
           <>
                <label className="col-md-12">{props.label}</label>
                <input
                className="col-md-12 kjga-input-box"
                type={props.type_2}
                autoComplete="off"
                value={props.amount}
                onChange={props.change}
                />
            </>
        )
        
    }
    
}

export default InputArea;
