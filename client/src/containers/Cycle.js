import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import GeneralButton from "./../components/Button/GeneralButton";
import GeneralTable from "./../components/Table";
import PageHeader from "./../components/PageHeader"
import {
  cycles,
  currentCycle,
  specificCycle,
  salesSummary,
  editSalesRecord,
} from "./../actions/operations";
import { Dropdown } from "react-bootstrap";
import "./../styling/main.css";

class Cycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      data: null,
      edit: 0,
      cleaned_data: null,
    };
    this.handleCycleList = this.handleCycleList.bind(this);
    this.handleFinalEdit = this.handleFinalEdit.bind(this);
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    } else {
      this.props.cycles((data) => {
        if (data) {
          this.setState({showRefreshBox: true})
        }else{
        this.setState({ list: this.props.cycleList });
        }
      });
    }
  }
  handleCycleList(item) {
    this.props.specificCycle(
      { start_date: item.start_date, end_date: item.end_date },
      (data) => {
        if (data) {
          this.setState({showRefreshBox: true})
        }else{
        if (this.props.sCycle) {
          let cleaned = [];
          this.props.sCycle.data.map((item, index) => {
            cleaned.push([
              item.client_name,
              item.quantity,
              item.price,
              item.amount,
              new Date(item.transaction_date).toLocaleDateString(),
            ]);
          });

          this.setState({
            data: this.props.sCycle.data,
            cleaned_data: cleaned,
          });
        } else {
          console.log("failed");
        }
      }
    }
    );
  }

  renderQuantity() {
    if (this.state.data) {
      let total = 0;
      this.state.data.map((item, index) => {
        total += item.quantity;
      });
      return total.toFixed(2);
    } else {
      return 0;
    }
  }
  renderAmount() {
    if (this.state.data) {
      let total = 0;
      this.state.data.map((item, index) => {
        total += item.amount;
      });
      return total.toFixed(2);
    } else {
      return 0;
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
      (data) => {
        if (data) {
          this.setState({showRefreshBox: true})
        }else{
        this.setState({
          amount: "",
          quantity: "",
          edit: 0,
        });
      }
      }
    );
  }
  returnProfit() {
    if (this.state.data) {
      return this.state.data[0].cash - this.renderAmount();
    } else {
      return 0;
    }
  }
  returnSales() {
    if (this.state.data) {
      return this.state.data[0].cash;
    } else {
      return 0;
    }
  }
  returnSalesAmount() {
    if (this.state.data) {
      return this.state.data[0].quantity_sold;
    } else {
      return 0;
    }
  }

  calculateDetails() {
    if (this.state.data) {
      const details = {};
      const data = [];
      for (let i = 0; i < this.state.data.length; i++) {
        if (!details.hasOwnProperty(this.state.data[i].client_name)) {
          details[this.state.data[i].client_name] = {
            amount: this.state.data[i].amount,
            quantity: this.state.data[i].quantity,
          };
        } else {
          console.log("yes")
          details[this.state.data[i].client_name].amount += this.state.data[
            i
          ].amount;
          details[this.state.data[i].client_name].quantity += this.state.data[
            i
          ].quantity;
        }
      }
      let cleaned = Object.entries(details);
      cleaned.map((item, index) => {
        data.push([item[0], item[1].quantity, item[1].amount]);
      });
      return data;
    }
  }
  renderDetailsTable() {
    if (this.state.data) {
      let data = this.calculateDetails();
      return (
        <GeneralTable
          item_name={["客户", "克数", "金额"]}
          item_list={data}
        ></GeneralTable>
      );
    }
  }
  renderDropDown() {
    if (this.state.list) {
      return this.state.list.data.map((item, index) => {
        if (item.end_date !== 0) {
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

  render() {
    if (this.state.edit === 0) {
      return (
        <PageHeader>
              <div className="row">
                <div
                  className="col-lg-12"
                  
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
              <div
                  className="col-lg-12 table-wrapper"
                  
                >
              <GeneralTable
                item_list={[
                  [
                    `购买克数：${this.renderQuantity()}`,
                    `出售克数：${this.returnSalesAmount()}`,
                    `购买金额：${this.renderAmount()}`,
                    `出售金额：${this.returnSales()}`,
                    `利润：${this.returnProfit()}`
                    
                  ],
                ]}
                
              ></GeneralTable>
              
              <GeneralTable
                item_name={["客户", "克数", "价格", "金额", "日期"]}
                item_list={this.state.cleaned_data}
              >
                {this.renderSales()}
              </GeneralTable>
              

              {this.renderDetailsTable()}
              </div>
        </PageHeader>
      );
    } else {
      return (
        <PageHeader>
              <div className="row">
                <div
                  className="col-lg-12"
                 
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
        </PageHeader>
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
    auth: state.auth.authenticated,
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
