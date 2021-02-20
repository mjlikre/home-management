import React from "react";
import { compose } from "redux";
import { connect } from "react-redux"; 
import {
    deleteTransaction,
    getSummary
  } from "./../actions/operations";

const DeleteButton = (props) => {

  const handleDelete = () => {
    props.deleteTransaction(props.item, ()=> {props.getSummary(()=> {console.log("lol")})})
  }
  return <button className="cancel-button" onClick = {()=> {handleDelete()}}>X</button>;
};

export default compose(connect(null, {deleteTransaction, getSummary}))(DeleteButton);
