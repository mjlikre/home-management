import React, { Component } from "react";
import { Table } from "react-bootstrap";

class SummaryBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }

  renderSummaryBox() {
    if (this.state.data) {
      return this.state.data.map((item, index) => {
        return (
          <tr>
            <th>{item.client_name}</th>
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
      this.state.data.map((item, index) => {
        total += item.quantity;
      });
      return total;
    }
  }
  renderAmount() {
    if (this.state.data) {
      let total = 0;
      this.state.data.map((item, index) => {
        total += item.amount;
      });
      return total;
    }
  }
  render() {
    if (this.state.data) {
      return (
        <div>
          {this.props.children}
          <div className="row">
            <div className="col-lg-12" style={{ padding: "20px 0 20px 20px" }}>
              <Table>
                <thead>
                  <tr>
                    <th className="paymentTable">客户</th>
                    <th className="paymentTable">克数</th>
                    <th className="paymentTable">价格</th>
                    <th className="paymentTable">金额</th>
                    <th className="paymentTable">日期</th>
                    <th className="paymentTable">删除</th>
                  </tr>
                </thead>
                <tbody>{this.renderSummaryBox()}</tbody>
              </Table>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12" style={{ padding: "20px 0 20px 20px" }}>
              <Table>
                <tbody>
                  <tr>
                    <th>目前总结</th>
                    <th>购买克数：{this.renderQuantity()}</th>
                    <th>购买金额：{this.renderAmount()}</th>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-lg-12" style={{ padding: "20px 0 20px 20px" }}>
            <Table>
              <thead>
                <tr>
                  <th className="paymentTable">客户</th>
                  <th className="paymentTable">克数</th>
                  <th className="paymentTable">价格</th>
                  <th className="paymentTable">金额</th>
                  <th className="paymentTable">日期</th>
                  <th className="paymentTable">删除</th>
                </tr>
              </thead>
              <tbody>{this.renderSummaryBox()}</tbody>
            </Table>
          </div>
        </div>
      );
    }
  }
}

export default SummaryBox;
