import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {  Spinner } from "react-bootstrap";
import { getClient, getClientList, inputClient } from "./../actions/operations";
import GeneralButton from "./../components/Button/GeneralButton";
import DatePicker from "react-datepicker";
import PageHeader from "./../components/PageHeader"
import GeneralTable from "./../components/Table";
import DropdownBox from "./../components/DropdownBox"
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';



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
    this.dropdownClick = this.dropdownClick.bind(this);
  }
  
  renderLineChart (){
    
    if (this.state.data) {
      const data = []
      this.state.data.data.map((item, index) => {
        let temp = {}
        temp.date = new Date(item.transaction_date).toLocaleDateString();
        temp.价格= item.price
        temp.数量 = item.quantity
        temp.金额 = item.amount
        return data.unshift(temp)
      })
      return(
        <div>
          价格浮动表
          <BarChart width={600} height={400} data={data} >
        
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="价格" fill="#8884d8" barSize={30} />
          </BarChart>
          <br/>
          金额浮动表
          <BarChart width={600} height={400} data={data} >
        
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="金额" fill="#8884d8" barSize={30} />
          </BarChart>
         
          <br/>
          克数浮动表
          <BarChart width={600} height={400} data={data} >
        
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="数量" fill="#8884d8" barSize={30} />
          </BarChart>
        </div>
        
      )
    }
    
  };
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/signin");
    }else{
      this.props.getClientList((data)=> {
        if (data) {
          this.setState({showRefreshBox: true})
        }else{
        this.setState({ clientList: this.props.clientList })
        }
      })
    }
  }
  searchHandle() {
    let data = {
      start: this.state.sTime,
      end: this.state.eTime,
      name: this.state.client,
    };
    this.props.getClient(data, (data) => {
      if (data) {
        this.setState({showRefreshBox: true})
      }else{
      this.setState({
        data: this.props.client,
      });
    }
    });
  }
  

  dropdownClick(clientName) {
    this.setState({ client: clientName})
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
    this.props.inputClient({client_name: this.state.client}, (data)=> {
      if (data) {
        this.setState({showRefreshBox: true})
      }else{
      this.props.getClientList(()=> {
        this.setState({
          clientEdit: 0,
          clientList: this.props.clientList,
          client: " "
        })
      })
    }
    })
  }
  cleanData () {
    if (this.state.data){
      let data = []
      this.state.data.data.map((item, index) => {
        return data.push(["", item.quantity, item.price, item.amount, new Date(item.transaction_date).toLocaleDateString()])
      })
      return data
    }else {
      return 0
    }
  }

  render() {
    if (this.state.clientEdit === 0 && this.state.clientList){
      return (
        <PageHeader>
              <DropdownBox dropdownName = {this.state.client} dropdownList = {this.state.clientList} handleClick = {this.dropdownClick}></DropdownBox>
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
                <GeneralTable item_name = {[" ","克数","价格","金额","日期"]} item_list = {this.cleanData()}>
                      <th>总结</th>
                      <th>{this.renderQuantity()}</th>
                      <th></th>
                      <th>{this.renderAmount()}</th>
                </GeneralTable>
              <div>
                <GeneralButton type="primary" buttonName="添加客户" handleClick={this.handleEdit}></GeneralButton>
                </div>
                <div>
                {this.renderLineChart()}
                </div>
                
                
              
            </PageHeader>
      );
    }
    else if(this.state.clientEdit && this.state.clientList) {
      return (
        <PageHeader>
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
              </PageHeader>
      );
    }else{
      return(
        <PageHeader>
          <Spinner animation="border" />
        </PageHeader>
      )
    }
    
  }
}
function mapStateToProps(state) {
  return {
    client: state.operations.client,
    clientError: state.operations.clientError,
    clientList: state.operations.clientList,
    auth: state.auth.authenticated
  };
}
export default compose(connect(mapStateToProps, { getClient, getClientList, inputClient }))(Client);
