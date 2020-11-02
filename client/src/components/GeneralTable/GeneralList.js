import React, { Component } from "react";
import {Table} from "react-bootstrap";
import "./General.css";

class GeneralList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_list: [],
    };
  }
  componentDidMount () {
    console.log(this.props.groceryList)
    this.setState({ 
      item_list: this.props.groceryList
    })
  }
  renderGreenDot (item){
    if (item === 1) {
      return (
        <div className = "greendot"> </div>
      )
    }
    else {
      return (
        <div className = "greydot"> </div>
      )
    }

  }

  renderItem() {
    if (this.state.item_list.length !== 0) {
      return this.state.item_list.map((item, index) => {
        return (
          <tr>
                <th> *</th>
                <th>{item.item}</th>
                <th>{item.price}</th>
                <th>{item.ppp}</th>
                <th>
                  {this.renderGreenDot(item.TC)}
                </th>
                <th>
                  {this.renderGreenDot(item.MJ)}
                </th>
                <th>
                  {this.renderGreenDot(item.JC)}
                </th>
                <th>
                  {this.renderGreenDot(item.CO)}
                </th>
                <th>
                  {this.renderGreenDot(item.ER)}
                </th>
                <th>
                  {this.renderGreenDot(item.CW)}
                </th>
                <th>
                  {this.renderGreenDot(item.AL)}
                </th>
                <th>
                  {this.renderGreenDot(item.MW)}
                </th>
                <th>
                  {this.renderGreenDot(item.CY)}
                </th>
                <th>
                  {this.renderGreenDot(item.MR)}
                </th>
          </tr>
        );
      });
    } else {
      return <tr><th>There's nothing for you here</th></tr>
    }
  }
  render() {
    return (
      <div className="kjga-wrapper">
        <div className="kjga-outer-container">
          <div className="container kjga-container">
            <div className="jumbotron kjga-box">
              <h2>{this.props.name}</h2>
              {this.props.children}
              <div className="row container">
                <Table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>/Person</th>
                        <th>Toby</th>
                        <th>Mike</th>
                        <th>John</th>
                        <th>Chib</th>
                        <th>Emy</th>
                        <th>Chris</th>
                        <th>Phil</th>
                        <th>Merrle</th>
                        <th>Joe</th>
                        <th>Tony</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItem()}
                    </tbody>

                </Table>
                  
                </div>
              <br />
              <br />
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GeneralList;
