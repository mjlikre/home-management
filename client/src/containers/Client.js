import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Table, Dropdown } from "react-bootstrap";
import { getClient, getClientList, inputClient } from "./../actions/operations";
import GeneralButton from "./../components/Button/GeneralButton";
import DatePicker from "react-datepicker";
import Navbar from "./../components/NavBar";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';



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
      clientList: null,
      clientEdit: 0
    };
    this.searchHandle = this.searchHandle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleFinalEdit = this.handleFinalEdit.bind(this);
  }
  renderLineChart (){
    
    
    if (this.state.data) {
      const data = []
      this.state.data.data.map((item, index) => {
        let temp = {}
        temp.date = new Date(item.transaction_date).toLocaleDateString();
        temp.price = item.price
        temp.quantity = item.quantity
        temp.amount = item.amount
        return data.unshift(temp)
      })
      return(
        <div>
          价格浮动表
          <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
          </LineChart>
          <br/>
          金额浮动表
          <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
          </LineChart>
          <br/>
          克数浮动表
          <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
          </LineChart>
        </div>
        
      )
    }
    
  };
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    }else{
      this.props.getClientList(()=> {
        this.setState({ clientList: this.props.clientList })
      })
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
  renderClients() {
    if (this.state.clientList) {
      return this.state.clientList.data.map((item, index) => {
        return (
          <Dropdown.Item href="#/action-1" onClick={() => {this.setState({ client: item.client_name });}}>{item.client_name}</Dropdown.Item>
        )
      })
    }
  }
  renderSummaryBox() {
    if (this.state.data) {
      return this.state.data.data.map((item, index) => {
        return (
          <tr>
            <th></th>
            <th>{item.quantity}</th>
            <th>{item.price}</th>
            <th>{item.amount}</th>
            <th>{new Date(item.transaction_date).toLocaleDateString()}</th>
          </tr>
        );
      });
    }
  }
  handleEdit() {
    this.setState({
      clientEdit: 1
    })
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
  handleFinalEdit() {
    this.props.inputClient({client_name: this.state.client}, ()=> {
      this.props.getClientList(()=> {
        this.setState({
          clientEdit: 0,
          clientList: this.props.clientList,
          client: " "
        })
      })
    })
  }

  render() {
    if (this.state.clientEdit === 0){
      return (
        <div>
          <Navbar navType="grocery" />
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="kjga-display-block col-lg-10">
              <div className="row">
                <div className="col-md-12">
                  <label className="col-md-12">客户</label>
                  <div className="dropdown-container">
                    <div className="name-box">{this.state.client}</div>
  
                    <div className="col-md-6">
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          请选客户
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.renderClients()}
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
                  <Table className = "table table-striped table-bordered table-hover">
                    <thead className = "thead-dark">
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
                <div>
                {this.renderLineChart()}
                </div>
                <div>
                <GeneralButton type="primary" buttonName="添加客户" handleClick={this.handleEdit}></GeneralButton>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
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
            </div>
          </div>
        </div>
      );
    }
    
  }
}
function mapStateToProps(state) {
  return {
    client: state.operations.client,
    clientError: state.operations.clientError,
    clientList: state.operations.clientList
  };
}
export default compose(connect(mapStateToProps, { getClient, getClientList, inputClient }))(Client);
