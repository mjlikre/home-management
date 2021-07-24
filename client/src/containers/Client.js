import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getClient, getClientList, inputClient } from "./../actions/operations";
import GeneralButton from "./../components/Button/GeneralButton";
import PageHeader from "./../components/PageHeader";
import GeneralTable from "./../components/Table";
import DropdownBox from "./../components/DropdownBox";

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      client: null,
      startDay: null,
      endDay: null,
      clientList: null,
      clientEdit: 0,
    };
    this.searchHandle = this.searchHandle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleFinalEdit = this.handleFinalEdit.bind(this);
    this.dropdownClick = this.dropdownClick.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    } else {
      this.props.getClientList(() => {
        this.setState({ clientList: this.props.clientList });
      });
    }
  }
  searchHandle() {
    if (this.state.client) {
      let data = {
        name: this.state.client,
      };
      this.props.getClient(data, () => {
        this.setState({
          data: this.props.client,
        });
      });
    }
    
  }

  dropdownClick(clientName) {
    this.setState({ client: clientName });
  }
  handleEdit() {
    this.setState({
      clientEdit: 1,
    });
  }
  renderQuantity() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data.map((item, index) => {
        return (total += item.quantity);
      });
      return Math.round(total);
    }
  }
  renderAmount() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data.map((item, index) => {
        return (total += item.amount);
      });
      return Math.round(total);
    }
  }
  renderLastPrice() {
    if (this.state.data) {
      return this.state.data.data[0].price
    }
  }
  renderAveragePrice() {
    if (this.state.data) {
      let total = 0;
      this.state.data.data.map((item, index) => {
        return (total += item.price);
      });
      return Math.round(total/this.state.data.data.length);
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
  componentDidUpdate() {
    if (!this.props.auth) {
      this.props.history.push("/signout");
    }
  }
  handleFinalEdit() {
    this.props.inputClient({ client_name: this.state.client }, () => {
      this.props.getClientList(() => {
        this.setState({
          clientEdit: 0,
          clientList: this.props.clientList,
          client: " ",
        });
      });
    });
  }
  cleanData() {
    if (this.state.data) {
      let data = [];
      this.state.data.data.map((item, index) => {
        return data.push([
          "",
          item.quantity,
          item.price,
          item.amount,
          new Date(item.transaction_date).toLocaleDateString(),
        ]);
      });
      return data;
    } else {
      return 0;
    }
  }

  render() {
    if (this.state.clientEdit === 0 && this.state.clientList) {
      return (
        <PageHeader>
          <div className="row">
            <div className="col-md-2">
              <DropdownBox
                dropdownName={this.state.client}
                dropdownList={this.state.clientList}
                handleClick={this.dropdownClick}
              ></DropdownBox>
            </div>
            <div className="col-md-2" style={{ top: "27px" }}>
              <GeneralButton
                type="primary"
                buttonName="寻找"
                handleClick={this.searchHandle}
              />{" "}
            </div>
            <div className="col-md-2" style={{ top: "27px" }}>
              最后价格：{this.state.data ? this.renderLastPrice() : 0}
            </div>
            <div className="col-md-2" style={{ top: "27px" }}>
              平均价格：{this.state.data ? this.renderAveragePrice() : 0}
            </div>
            <div className="col-md-2" style={{ top: "27px" }}>
              总交易额：{this.state.data ? this.renderAmount() : 0}
            </div>
            <div className="col-md-2" style={{ top: "27px" }}>
              总交易数量：{this.state.data ? this.renderQuantity() : 0}
            </div>
          </div>

          <div className="col-lg-12 table-wrapper">
            <GeneralTable
              item_name={[this.state.client, "克数", "价格", "金额", "日期"]}
              item_list={this.cleanData()}
            >
              <th>总结</th>
              <th>{this.renderQuantity()}</th>
              <th></th>
              <th>{this.renderAmount()}</th>
            </GeneralTable>
          </div>
          <div>
            <GeneralButton
              type="primary"
              buttonName="添加客户"
              handleClick={this.handleEdit}
            ></GeneralButton>
          </div>
        </PageHeader>
      );
    } else if (this.state.clientEdit && this.state.clientList) {
      return (
        <PageHeader>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-md-2">
                  <label className="col-md-12">客户姓名</label>
                  <input
                    className="col-md-12 kjga-input-box"
                    type="text"
                    value={this.state.client}
                    onChange={(event) => {
                      this.setState({ client: event.target.value });
                    }}
                  />
                </div>
                <div className="col-md-2">
                  <div className="col-md-12">
                    <br></br>
                  </div>
                  <div className="col-md-12">
                    <GeneralButton
                      type="primary"
                      buttonName="加入客户"
                      handleClick={this.handleFinalEdit}
                    />
                  </div>
                </div>
              </div>
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
    client: state.operations.client,
    clientError: state.operations.clientError,
    clientList: state.operations.clientList,
    auth: state.auth.authenticated,
  };
}
export default compose(
  connect(mapStateToProps, { getClient, getClientList, inputClient })
)(Client);
