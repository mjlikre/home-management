import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Navbar from "./../components/NavBar";
import GeneralButton from "./../components/Button/GeneralButton";
import {
  cycles,
  currentCycle,
  specificCycle,
  salesSummary,
  editSalesRecord,
} from "./../actions/operations";
import { Table, Dropdown } from "react-bootstrap";
import "./../styling/main.css";

class Cycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      data: null,
      edit: 0,
    };
    this.handleCycleList = this.handleCycleList.bind(this);
    this.handleFinalEdit = this.handleFinalEdit.bind(this);
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    } else {
      this.props.cycles(() => {
        this.setState({ list: this.props.cycleList });
      });
    }
  }
  handleCycleList(item) {
    this.props.specificCycle(
      { start_date: item.start_date, end_date: item.end_date },
      () => {
        if (this.props.sCycle) {
          console.log(this.props.sCycle.data);
          this.setState({ data: this.props.sCycle.data });
        } else {
          console.log("failed");
        }
      }
    );
  }
  renderDropDown() {
    if (this.state.list) {
      return this.state.list.data.map((item, index) => {
        if (item.end_date != 0) {
          return (
            <Dropdown.Item
              href="#/action-1"
              onClick={() => {
                this.handleCycleList(item);
              }}
            >
              {item.cycle_number}
            </Dropdown.Item>
          );
        }
      });
    }
  }
  renderSummaryBox() {
    if (this.state.data) {
      return this.state.data.map((item, index) => {
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
  handleEdit(data) {
    this.setState({
      quantity: data.quantity_sold,
      amount: data.cash,
      edit: 1,
    });
  }
  renderSales() {
    if (this.state.data) {
      return (
        <tr>
          <th>出售</th>
          <th>出售克数：{this.state.data[0].quantity_sold}</th>
          <th>出售金额：{this.state.data[0].cash}</th>
          <th>
            <button
              onClick={() => {
                this.handleEdit(this.state.data[0]);
              }}
            >
              编辑
            </button>
          </th>
        </tr>
      );
    }
  }
  handleFinalEdit() {
    this.props.editSalesRecord(
      { id: this.state.data[0].cycle_id, amount: this.state.amount },
      () => {
        this.setState({
          amount: "",
          quantity: "",
          edit: 0,
        });
      }
    );
  }
  render() {
    if (this.state.edit === 0) {
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
                  <div className="col-md-12">
                    <label className="col-md-12">周期</label>
                    <div className="dropdown-container">
                      <div className="name-box">{this.state.client}</div>

                      <div className="col-md-6">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            请选周期
                          </Dropdown.Toggle>

                          <Dropdown.Menu>{this.renderDropDown()}</Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-lg-12"
                  style={{ padding: "20px 0 20px 20px" }}
                >
                  <div className="col-md-12">
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
                        {this.renderSales()}
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
                      <tbody>
                        <tr>
                          <th>总结</th>
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
        </div>
      );
    } else {
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
                    <div className="col-md-2">
                      <label className="col-md-12">克数</label>
                      <input
                        className="col-md-12 kjga-input-box"
                        type="number"
                        value={this.state.quantity}
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
                      <div className="col-md-12">
                        <br></br>{" "}
                      </div>
                      <div className="col-md-12">
                        <GeneralButton
                          type="primary"
                          buttonName="编辑"
                          handleClick={this.handleFinalEdit}
                        />
                      </div>
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
}

function mapStateToProps(state) {
  return {
    cycleList: state.operations.cycleList,
    cCycle: state.operations.currentCycle,
    sCycle: state.operations.specificCycle,
    cycleError: state.operations.cycleError,
    sales: state.operations.sales,
  };
}

export default compose(
  connect(mapStateToProps, {
    cycles,
    currentCycle,
    specificCycle,
    salesSummary,
    editSalesRecord,
  })
)(Cycle);
