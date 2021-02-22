import React from "react";
import { compose } from "redux";
import { connect } from "react-redux"; 
import { Button
} from "react-bootstrap"
import {
    restoreDeleted,
    getDeleted
  } from "../../actions/operations";

const DeleteButton = (props) => {

  const handleDelete = () => {
    props.restoreDeleted(props.item, ()=> {props.getDeleted()})
  }
  return <Button onClick = {()=> {handleDelete()}}>还原</Button>;
};

export default compose(connect(null, {restoreDeleted, getDeleted}))(DeleteButton);
