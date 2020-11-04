import React, {Component} from "react"; 
import {compose} from "redux";
import {connect} from "react-redux";
import Navbar from "./../components/NavBar"
import { getSummary, inputTransaction, deleteTransaction } from "./../actions/operations"
import { Table, Dropdown } from "react-bootstrap";
import GeneralButton from "./../components/Button/GeneralButton"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './../styling/main.css'
class Main extends Component {
    constructor(props){
        super(props)
        this.state={
            data: null,
            client: null,
            date: null,
            quantity: null,
            price: null,
            amount: null,
            timestamp: null


        }
        this.newItemHandle = this.newItemHandle.bind(this)
    }
    componentDidMount () {
        if (!localStorage.getItem("token")) {
            this.props.history.push("/signin");
        }else{
            this.props.getSummary(()=>{this.setState({
                data: this.props.summary
            })})
        }
        
    }
    newItemHandle () {
        const item = {
            client_name: this.state.client,
            quantity: this.state.quantity,
            price: this.state.price,
            amount: this.state.amount,
            transaction_date: this.state.timestamp
        }
        this.props.inputTransaction(item, ()=>{
            this.setState({
                client: null,
                date: null,
                quantity: null,
                price: null,
                amount: null,
                timestamp: null
            },()=>{
                this.props.getSummary(()=>{
                    this.setState({
                        data: this.props.summary
                    })
                })
            })
        })
    }
    handleDateChange = date => { 
    
        this.setState ({
          date: date,
          timestamp: Date.parse(date)
        })
    }
    renderSummaryBox () {
        if (this.state.data) {
            return this.state.data.data[0].map((item, index) => {
              return (
                <tr>
                  <th>{item.client_name}</th>
                  <th>{item.quantity}</th>
                  <th>{item.price}</th>
                  <th>{item.amount}</th>
                  <th>{new Date(item.transaction_date).toLocaleDateString()}</th>
                  <th>
                        <button className = "cancel-button" onClick = {()=>{this.handleDelete(index)}}>X</button>
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
            id: this.state.data.data[0][index].transaction_id,
            amount: this.state.data.data[0][index].amount, 
            quantity: this.state.data.data[0][index].quantity
        }
        this.props.deleteTransaction(data, () => {
            this.props.getSummary(()=>{
                this.setState({
                    data: this.props.summary
                })
            })
        })
    }
    render() {
        if (this.state.data) {
            return(
                <div>
                    <Navbar navType="grocery" />
                    <div className="row">
                        <div className = "col-lg-1"></div>
                        <div className="kjga-display-block col-lg-10">
                            <div className="row">
                                <div
                                className="col-lg-12"
                                style={{ padding: "20px 0 20px 20px" }}
                                >
                                    <h3>现有牛黄克数：{this.state.data.data[1][0].quantity}克</h3>
                                </div>
                            </div>
                            <div className = "row">
                                    <div className = "col-md-12">
                                        <label className = "col-md-12">客户</label>
                                        <div className = "dropdown-container">
                                            
                                            <div className = "name-box">{this.state.client}</div>
                                            
                                            <div className = "col-md-6">
                                                
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    请选客户
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Monzon"})}}>Monzon</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2" onClick ={() => {this.setState({client: "Misaer"})}}>Misaer</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Ruben"})}}>Ruben</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Lijia"})}}>Lijia</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Ala"})}}>Ala</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Victor"})}}>Victor</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Julio"})}}>Julio</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Condega"})}}>Condega</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Mainca"})}}>Mainca</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Nuevo Karnil"})}}>Nuevo Karnil</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-1" onClick ={() => {this.setState({client: "Sukarne"})}}>Sukarne</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                
                                <div className = "row">
                                    <div className = "col-md-2">
                                        <label className = "col-md-12">克数</label>
                                        <input className = "col-md-12 kjga-input-box" type = "number" value = {this.state.quantity} onChange = {event => {this.setState({quantity: event.target.value})}}/>
                                    </div>
                                    <div className = "col-md-2">
                                        <label className = "col-md-12">价格</label>
                                        <input className = "col-md-12 kjga-input-box" type = "number" value = {this.state.price} onChange = {event => {this.setState({price: event.target.value})}}/>
                                    </div>
                                    <div className = "col-md-2">
                                        <label className = "col-md-12">金额</label>
                                        <input className = "col-md-12 kjga-input-box" type = "number" value = {this.state.amount} onChange = {event => {this.setState({amount: event.target.value})}}/>
                                    </div>
                                    <div className = "col-md-3">
                                        <label className = "col-md-12">日期</label>
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            selected={this.state.date}
                                            onChange= {this.handleDateChange}
                                        />
                                    </div>
                                    <div className = "col-md-2">
                                        <div className = "col-md-12"><br></br> </div>
                                        <div className = "col-md-12">
                                            <GeneralButton type = "primary" buttonName ="输入" handleClick ={this.newItemHandle}/>
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
                                        <th className="paymentTable">删除</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderSummaryBox()}
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
                                    <tbody>
                                        {this.renderSalesSummary()}
                                    </tbody>
                                </Table>
                              
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )
        }else{
            return(
                <div>
                    <Navbar navType="grocery" />
                    <div className="kjga-display-block col-lg-8"><h1>加载中，请稍等</h1></div>
                    
                </div>
            )
        }
        
    }

}

function mapStateToProps(state) {
    return {
        summary: state.operations.summary,
        summaryError: state.operations.summaryError
    }
}
export default compose(
    connect(mapStateToProps, { getSummary, inputTransaction, deleteTransaction })
)(Main)