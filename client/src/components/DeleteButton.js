import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux"; 
import {
    deleteTransaction,
    getSummary
  } from "./../actions/operations";

const DeleteButton = (props) => {
  const [item, setItem] = useState({
      id: props.item.transaction_id,
      amount: props.item.amount,
      cycle_id: props.item.cycle_id,
      quantity: props.item.quantity
  });
  const handleDelete = () => {
    props.deleteTransaction(item, ()=> {props.getSummary(()=> {console.log("lol")})})
  }
  return <button className="cancel-button" onClick = {()=> {handleDelete()}}>X</button>;
};

export default compose(connect(null, {deleteTransaction, getSummary}))(DeleteButton);
