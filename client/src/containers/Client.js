import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Table, Dropdown } from "react-bootstrap";
import { getClient } from "./../actions/operations";
import GeneralButton from "./../components/Button/GeneralButton";
import DatePicker from "react-datepicker";
import Navbar from "./../components/NavBar";

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      client: null,
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
  searchHandle() {
    let data = {
      start: this.state.sTime,
      end: this.state.eTime,
      name: this.state.client,
    };
    this.props.getClient(data, () => {
      this.setState({
        data: this.props.client,
      });
    });
  }

  renderSummaryBox() {
    if (this.state.data) {
      return this.state.data.data.map((item, index) => {
        return (
          <tr>
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
      this.state.data.data.map((item, index) => {
        total += item.quantity;
      });
      return total;
    }
  }
  renderAmount() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data.map((item, index) => {
        total += item.amount;
      });
      return total;
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

  render() {
    return (
      <div>
        <Navbar navType="grocery" />
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="kjga-display-block col-lg-10">
            <div className="row">
              <div className="col-md-12">
                <label className="col-md-12">clientes</label>
                <div className="dropdown-container">
                  <div className="name-box">{this.state.client}</div>

                  <div className="col-md-6">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        请选客户
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Monzon" });
                          }}
                        >
                          Monzon
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          onClick={() => {
                            this.setState({ client: "Misaer" });
                          }}
                        >
                          Misaer
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Ruben" });
                          }}
                        >
                          Ruben
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Lijia" });
                          }}
                        >
                          Lijia
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Ala" });
                          }}
                        >
                          Ala
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Victor" });
                          }}
                        >
                          Victor
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Julio" });
                          }}
                        >
                          Julio
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Condega" });
                          }}
                        >
                          Condega
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Mainca" });
                          }}
                        >
                          Mainca
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Nuevo Karnil" });
                          }}
                        >
                          Nuevo Karnil
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => {
                            this.setState({ client: "Sukarne" });
                          }}
                        >
                          Sukarne
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
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
                <label className="col-md-12">结束日期</label>
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
                      <th></th>
                      <th className="paymentTable">克数</th>
                      <th className="paymentTable">价格</th>
                      <th className="paymentTable">金额</th>
                      <th className="paymentTable">日期</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderSummaryBox()}
                    <th>总结</th>
                    <th>{this.renderQuantity()}</th>
                    <th></th>
                    <th>{this.renderAmount()}</th>
                  </tbody>
                </Table>
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
    client: state.operations.client,
    clientError: state.operations.clientError,
  };
}
export default compose(connect(mapStateToProps, { getClient }))(Client);
