import React, {Component} from 'react';
import "./../../styling/main.css"


class GeneralButton extends Component {
  render() {
      if (this.props.type === "primary") {
          return (
            <button className = "primary-button" onClick = {()=>{this.props.handleClick()}}>{this.props.buttonName}</button>
          )
      }
      else if(this.props.type === "secondary") {
          return (
            <button className = "secondary-button" onClick = {()=>{this.props.handleClick()}}>{this.props.buttonName}</button>
          )
      }
      else if(this.props.type === "cancel") {
        return (
          <button className = "cancel-button" onClick = {this.props.handleClick()}>{this.props.buttonName}</button>
        )
      }
      else if(this.props.type === "inactive") {
        return (
          <button className = "secondary-button" disabled>{this.props.buttonName}</button>
        )
      }
  }
};

export default GeneralButton;