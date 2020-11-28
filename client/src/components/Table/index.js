import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./General.css";
class GeneralTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_list: null,
      item_name: null
    };
  }
  componentDidMount () {
    this.setState({ 
      item_list: this.props.item_list,
      item_name: this.props.item_name
    })
  }
  componentDidUpdate(prevProps, prevState) {
      if (prevProps.item_list !== this.props.item_list){
          this.setState({item_list : this.props.item_list})
      }
  }
  renderThead() {
      if (this.state.item_name) {
          return this.state.item_name.map((item, index)=> {
              return (
              <th className = "paymentTable">{item}</th>
              )
          })
      }
  }
  renderIndividualItems(item) {
      return item.map((item, index) => {
          return(
              <th className = "paymentTable">{item}</th>
          )
      })
  }
  renderTbody() {
      if(this.state.item_list) {
          console.log(this.state.item_list)
        return this.state.item_list.map((item, index) => {
            return (
              <tr>
                {this.renderIndividualItems(item)}
              </tr>
            );
        });
      }
  }

  
  
  render() {
    return (
      <div className="row">
        <div
            className="col-lg-12"
            style={{ padding: "20px 0 20px 20px" }}
        >
            <Table striped bordered hover>
            <thead className = "thead-dark">
                <tr>
                {this.renderThead()}
                </tr>
            </thead>
            <tbody>
                {this.renderTbody()}
            </tbody>
            {this.props.children}
            
            </Table>
        </div>
    </div>
    );
  }
}

export default GeneralTable;
