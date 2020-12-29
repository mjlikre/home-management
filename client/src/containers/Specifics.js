import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Navbar from "./../components/NavBar";
import { getDaily, getMonthly, getSummary } from "./../actions/operations";
import { Table } from "react-bootstrap";
import GeneralButton from "./../components/Button/GeneralButton";
import DatePicker from "react-datepicker";
import "./../styling/main.css";

class Specifics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      startDay: null,
      endDay: null,
      sTime: null,
      eTime: null,
    };
    this.searchHandle = this.searchHandle.bind(this);
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth && !this.props.auth) {
      this.props.history.push("/signout")
    }
  }
  handleStartDayChange = (date) => {
    this.setState({
      startDay: date,
      sTime: Date.parse(date),
    });
  };
  handleEndDayChange = (date) => {
    this.setState({
      endDay: date,
      eTime: Date.parse(date),
    });
  };
  renderSalesSummary() {
    if (this.state.data) {
      return this.state.data.data[1].map((item, index) => {
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
  renderQuantity() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data[0].map((item, index) => {
        total += item.quantity;
      });
      return total;
    }
  }
  renderAmount() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data[0].map((item, index) => {
        total += item.amount;
      });
      return total;
    }
  }
  searchHandle() {
    let data = {
      start: this.state.sTime,
      end: this.state.eTime,
    };
    this.props.getDaily(data, (data) => {
      if (data) {
        this.setState({showRefreshBox: true})
      }else{
      this.setState({
        data: this.props.daily,
      });
    }
    });
  }
  renderSummaryBox() {
    if (this.state.data) {
      return this.state.data.data[0].map((item, index) => {
        return (
          <tr>
            <th>{item.client_name}</th>
            <th>{item.quantity}</th>
            <th>{item.price}</th>
            <th>{item.amount}</th>
            <th>{new Date(item.transaction_date).toLocaleDateString()}</th>
          </tr>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <Navbar navType="grocery" />
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="kjga-display-block col-lg-10">
            <div className="row">
              <div
                className="col-lg-12"
                style={{ padding: "20px 0 20px 20px" }}
              >
                <div className="row">
                  <div className="col-md-4">
                    <label className="col-md-12">开始日期</label>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.startDay}
                      onChange={this.handleStartDayChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="col-md-12">截止日期</label>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.endDay}
                      onChange={this.handleEndDayChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="col-md-12">
                      <br></br>{" "}
                    </div>
                    <div className="col-md-12">
                      <GeneralButton
                        type="primary"
                        buttonName="寻找"
                        handleClick={this.searchHandle}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-lg-12"
                    style={{ padding: "20px 0 20px 20px" }}
                  >
                    <Table>
                      <thead>
                        <tr>
                          <th className="paymentTable">客户</th>
                          <th className="paymentTable">克数</th>
                          <th className="paymentTable">价格</th>
                          <th className="paymentTable">金额</th>
                          <th className="paymentTable">日期</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderSummaryBox()}
                        <tr>
                          <th>总结</th>
                          <th>{this.renderQuantity()}</th>
                          <th></th>
                          <th>{this.renderAmount()}</th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-lg-12"
                    style={{ padding: "20px 0 20px 20px" }}
                  >
                    <Table>
                      <thead>
                        <tr>
                          <th className="paymentTable">出售</th>
                          <th className="paymentTable">克数</th>
                          <th className="paymentTable">金额</th>
                          <th className="paymentTable">日期</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderSalesSummary()}</tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    daily: state.operations.daily,
    dailyError: state.operations.dailyError,
    monthly: state.operations.monthly,
    monthlyError: state.operations.monthlyError,
    summary: state.operations.summary,
    summaryError: state.operations.summaryError,
    auth: state.auth.authenticated,
  };
}

export default compose(
  connect(mapStateToProps, { getDaily, getMonthly, getSummary })
)(Specifics);
