import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  getSummary,
  deleteTransaction,
} from "./../actions/operations";
import PageHeader from "./../components/PageHeader"
import { Table, Spinner } from "react-bootstrap";

import RefreshBox from "./../components/RefreshBox"
import PopupNewItem from "./../components/PopUp"
import "react-datepicker/dist/react-datepicker.css";
import "./../styling/main.css";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      client: "",
      date: "",
      quantity: 0,
      price: 0,
      amount: 0,
      timestamp: 0,
      clientList: null,
      showRefreshBox: false
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    } else {
      this.props.getSummary((data) => {
        if (!data) {
          
            this.setState({
              data: this.props.summary,
              clientList: this.props.clientList,
            });
          
        }else{
          this.setState({showRefreshBox: true})
        }
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.summary !== this.props.summary) {
      this.setState({
        data: this.props.summary
      });
    }
    if (!this.props.auth){
      this.props.history.push("/signin")
    }
  }
  
  
  renderSummaryBox() {
    if (this.state.data) {
      return this.state.data.data[1].map((item, index) => {
        return (
          <tr key = {index}>
            <th>{item.client_name}</th>
            <th>{item.quantity}</th>
            <th>{item.price}</th>
            <th>{item.amount}</th>
            <th>{new Date(item.transaction_date).toLocaleDateString()}</th>
            <th>
            
              <button
                className="cancel-button"
                onClick={() => {
                  this.handleDelete(index);
                }}
              >
                 X
              </button>
              
            </th>
          </tr>
        );
      });
    }
  }
  renderSalesSummary() {
    if (this.state.data) {
      return this.state.data.data[2].map((item, index) => {
        return (
          <tr>
            <th></th>
            <th>{item.quantity}</th>
            <th>{item.cash}</th>
            <th>{new Date(item.date_sold).toLocaleDateString()}</th>
          </tr>
        );
      });
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
  renderQuantity() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data[1].map((item, index) => {
        return total += item.quantity;
      });
      return total;
    }
  }
  renderAmount() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data[1].map((item, index) => {
        return total += item.amount;
      });
      return total;
    }
  }
  render() {
    if (this.state.data) {
      return (
        <PageHeader>
          
              <div className="header-grid">
                
                  <h3>
                    当前周期现有牛黄：{this.state.data.data[0][0].quantity}克
                  </h3>
                  <div></div>
                  <PopupNewItem authFailed = {()=>{this.setState({showRefreshBox: true})}}/>
                
              </div>
              <div className="row">
                <div
                  className="col-lg-12 table-wrapper"
                  
                >
                  <Table striped bordered hover>
                    <thead className = "thead-dark">
                      <tr>
                        <th className="paymentTable">客户</th>
                        <th className="paymentTable">克数</th>
                        <th className="paymentTable">价格</th>
                        <th className="paymentTable">金额</th>
                        <th className="paymentTable">日期</th>
                        <th className="paymentTable"></th>
                      </tr>
                    </thead>
                    <tbody>{this.renderSummaryBox()}</tbody>
                  </Table>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-lg-12"
                  
                >
                  <Table className = "table table-bordered">
                    <tbody className = "thead-light">
                      <tr>
                        <th>目前总结</th>
                        <th>购买克数：{this.renderQuantity()}</th>
                        <th>购买金额：{this.renderAmount()}</th>
                      </tr>
                    </tbody>
                  </Table>
                  
                </div>
              </div>
              
          </PageHeader>
      );
    } else {
      return (
        <PageHeader>
          <div className = "centered">
            <Spinner animation="border" />
            <RefreshBox show = {this.state.showRefreshBox}/>
          </div>
          
        </PageHeader>
      );
    }
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
