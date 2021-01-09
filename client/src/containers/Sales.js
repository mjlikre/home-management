import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  salesSummary,
  insertSales,
  deleteSales,
} from "../actions/operations";
import { Table, Spinner } from "react-bootstrap";
import PageHeader from "../components/PageHeader"
import InputArea from "../components/InputArea"
import GeneralButton from "../components/Button/GeneralButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./../styling/main.css";

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      date: null,
      quantity: null,
      amount: null,
      timestamp: null,
    };
    this.newItemHandle = this.newItemHandle.bind(this);
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    } else {
      this.props.salesSummary((data) => {
        if (data) {
          this.setState({showRefreshBox: true})
        }else{
        this.setState(
          {
            data: this.props.sales,
          },
          () => {
            console.log(this.state.data);
          }
        );
        }
      });
      
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth && !this.props.auth) {
      this.props.history.push("/signout")
    }
  }
  renderSummaryBox() {
    if (this.state.data) {
      return this.state.data.data.map((item, index) => {
        return (
          <tr>
            <th></th>
            <th>{item.quantity_sold}</th>
            <th>{item.cash}</th>
            <th>{new Date(item.date_sold).toLocaleDateString()}</th>
            <th>
              <button
                className="cancel-button"
                onClick={() => {
                  this.handleDelete(index);
                }}
              >
                删除
              </button>
            </th>
          </tr>
        );
      });
    }
  }
  renderQuantity() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data.map((item, index) => {
        return total += item.quantity_sold;
      });
      return total;
    }
  }
  renderAmount() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data.map((item, index) => {
        return total += item.cash;
      });
      return total;
    }
  }
  handleDateChange = (date) => {
    this.setState({
      date: date,
      timestamp: Date.parse(date),
    });
  };
  newItemHandle() {
    const item = {
      quantity: this.state.quantity,
      amount: this.state.amount,
      timestamp: this.state.timestamp,
    };
    this.props.insertSales(item, (data) => {
      if (data) {
        this.setState({showRefreshBox: true})
      }else{
      this.setState(
        {
          date: "",
          quantity: "",
          amount: "",
          timestamp: "",
        },
        () => {
          this.props.salesSummary(() => {
            this.setState({
              data: this.props.sales,
            });
          });
        }
      );
      }
    });
  }
  handleDelete(index) {
    const data = {
      id: this.state.data.data[index].id,
      amount: this.state.data.data[index].cash,
      quantity: this.state.data.data[index].quantity_sold,
    };
    this.props.deleteSales(data, (data) => {
      if (data) {
        this.setState({showRefreshBox: true})
      }else{
      this.props.salesSummary(() => {
        this.setState({
          data: this.props.sales,
        });
      });
    }
    });
  }
  render() {
    if (this.state.data) {
      return (
        <PageHeader>
        
              <div className="row">
                <InputArea label = "克数" amount = {this.state.quantity} change = {(event) => {this.setState({quantity: event.target.value})}} type = "normal"/>
                <InputArea label = "金额" amount = {this.state.amount} change = {(event) => {this.setState({amount: event.target.value})}} type = "normal"/>
                <div className="col-md-3">
                  <label className="col-md-12">日期</label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                  />
                </div>
                <div className="col-md-2">
                  <div className="col-md-12">
                    <br></br>{" "}
                  </div>
                  <div className="col-md-12">
                    <GeneralButton
                      type="primary"
                      buttonName="输入"
                      handleClick={this.newItemHandle}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-lg-12"
                  style={{ padding: "20px 0 20px 20px" }}
                >
                  <Table className = "table table-striped table-bordered table-hover">
                    <thead className = "thead-dark">
                      <tr >
                        <th className="paymentTable"></th>
                        <th className="paymentTable">克数</th>
                        <th className="paymentTable">金额</th>
                        <th className="paymentTable">日期</th>
                        <th className="paymentTable"></th>
                      </tr>
                    </thead>
                    <tbody >
                      {this.renderSummaryBox()}
                      <th className = "thead-light">总结</th>
                      <th className = "thead-light">{this.renderQuantity()}</th>
                      <th className = "thead-light">{this.renderAmount()}</th>
                    </tbody>
                  </Table>
                </div>
              </div>
        </PageHeader>
      );
    } else {
      return (
          <PageHeader>
            <Spinner animation="border" />
          </PageHeader>
            
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    sales: state.operations.sales,
    salesError: state.operations.salesError,
    auth: state.auth.authenticated
  };
}

export default compose(
  connect(mapStateToProps, { salesSummary, insertSales, deleteSales })
)(Sales);