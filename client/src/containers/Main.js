import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Navbar from "./../components/NavBar";
import {
  getSummary,
  inputTransaction,
  deleteTransaction,
  getClientList
} from "./../actions/operations";
import { Table, Dropdown, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import GeneralButton from "./../components/Button/GeneralButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./../styling/main.css";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      client: null,
      date: null,
      quantity: null,
      price: null,
      amount: null,
      timestamp: null,
      clientList: null,
    };
    this.newItemHandle = this.newItemHandle.bind(this);
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    } else {
      this.props.getSummary(() => {
        this.props.getClientList(()=>{
          this.setState({
            data: this.props.summary,
            clientList: this.props.clientList
          });
        })
        
      });
    }
  }
  renderClients() {
    if (this.state.clientList) {
      return this.state.clientList.data.map((item, index) => {
        return (
          <Dropdown.Item href="#/action-1" onClick={() => {this.setState({ client: item.client_name });}}>{item.client_name}</Dropdown.Item>
        )
      })
    }
  }
  newItemHandle() {
    const item = {
      client_name: this.state.client,
      quantity: this.state.quantity,
      price: this.state.price,
      amount: this.state.amount,
      transaction_date: this.state.timestamp,
    };
    this.props.inputTransaction(item, () => {
      this.setState(
        {
          client: "",
          date: "",
          quantity: "",
          price: "",
          amount: "",
          timestamp: "",
        },
        () => {
          this.props.getSummary(() => {
            this.setState({
              data: this.props.summary,
            });
          });
        }
      );
    });
  }
  handleDateChange = (date) => {
    this.setState({
      date: date,
      timestamp: Date.parse(date),
    });
  };
  renderSummaryBox() {
    if (this.state.data) {
      return this.state.data.data[1].map((item, index) => {
        return (
          <tr>
            <th>{item.client_name}</th>
            <th>{item.quantity}</th>
            <th>{item.price}</th>
            <th>{item.amount}</th>
            <th>{new Date(item.transaction_date).toLocaleDateString()}</th>
            <th>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">点击删除此记录</Tooltip>}>
              <span className="d-inline-block">
              <button
                className="cancel-button"
                onClick={() => {
                  this.handleDelete(index);
                }}
                
                
              >
                 删除
              </button>
              </span>
            </OverlayTrigger>
              
              
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
    this.props.deleteTransaction(data, () => {
      this.props.getSummary(() => {
        this.setState({
          data: this.props.summary,
        });
      });
    });
  }
  renderQuantity() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data[1].map((item, index) => {
        total += item.quantity;
      });
      return total;
    }
  }
  renderAmount() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data[1].map((item, index) => {
        total += item.amount;
      });
      return total;
    }
  }
  render() {
    if (this.state.data) {
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
                  <h3>
                    当前周期现有牛黄：{this.state.data.data[0][0].quantity}克
                  </h3>
                </div>
              </div>
              

              <div className="row">
                <div className = "col-md-2">
                <label className="col-md-12">客户</label>
                  <div className="dropdown-container">
                    <div className="col-md-6">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.client || "请选择客户"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          {this.renderClients()}
                      </Dropdown.Menu>
                    </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <label className="col-md-12">克数</label>
                  <input
                    className="col-md-12 kjga-input-box"
                    type="number"
                    value={this.state.quantity}
                    onChange={(event) => {
                      this.setState({ quantity: event.target.value });
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <label className="col-md-12">价格</label>
                  <input
                    className="col-md-12 kjga-input-box"
                    type="number"
                    value={this.state.price}
                    onChange={(event) => {
                      this.setState({ price: event.target.value });
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <label className="col-md-12">金额</label>
                  <input
                    className="col-md-12 kjga-input-box"
                    type="number"
                    value={this.state.amount}
                    onChange={(event) => {
                      this.setState({ amount: event.target.value });
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <label className="col-md-12">日期</label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    className="kjga-input-box"
                  />
                </div>
                <div className="col-md-2">
                  <div className="col-md-12">
                    <br/> 
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
                  style={{ padding: "20px 0 20px 20px" }}
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
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar navType="grocery" />
          <div className="kjga-display-block centered">
            <Spinner animation="border" />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    summary: state.operations.summary,
    summaryError: state.operations.summaryError,
    clientList: state.operations.clientList
  };
}
export default compose(
  connect(mapStateToProps, { getSummary, inputTransaction, deleteTransaction, getClientList })
)(Main);
