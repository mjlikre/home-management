import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getSummary,
  deleteTransaction,
} from "./../actions/operations";
import PageHeader from "./../components/PageHeader"
import MainTableContainer from "../components/Table/MainTableContainer"

import "react-datepicker/dist/react-datepicker.css";
import "./../styling/main.css";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      clientList: null,
      showRefreshBox: false
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    } 
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.auth){
      this.props.history.push("/signin")
    }
  }
  
  

  handleDelete(index) {
    const data = {
      id: this.state.data.data[1][index].transaction_id,
      amount: this.state.data.data[1][index].amount,
      quantity: this.state.data.data[1][index].quantity,
      cycle_id: this.state.data.data[1][index].cycle_id,
    };
    this.props.deleteTransaction(data, (data) => {
      if (data) {
        this.setState({showRefreshBox: true})
      }else{
      this.props.getSummary(() => {
        this.setState({
          data: this.props.summary,
        });
      });
    }
    });
  }

  render() {

      return (
        <PageHeader>
          
                  <MainTableContainer authFailed = {()=>{this.setState({showRefreshBox: true})}}/>

              
              
          </PageHeader>
      );
    
  }
}
function mapStateToProps(state) {
  return {
    summary: state.operations.summary,
    summaryError: state.operations.summaryError,
    clientList: state.operations.clientList,
    auth: state.auth.authenticated
  };
}
export default compose(
  connect(mapStateToProps, { getSummary, deleteTransaction })
)(Main);
