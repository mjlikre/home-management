import React, {Component} from "react";
import { compose } from "redux";
import { connect } from "react-redux"; 
import { Modal, Button } from "react-bootstrap"
import {inputTransaction, getClientList, getSummary, getClientPrice} from "../../actions/operations"
import DropdownBox from "../DropdownBox"
import DatePicker from "react-datepicker";
import InputArea from "../InputArea"
class PopupNewItem extends Component {
    constructor(props){
        super(props);
        this.state ={
            client: "",
            date: "",
            quantity: 0,
            price: 0,
            amount: 0,
            timestamp: 0,
            clientList: null,
            show: false

        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.submitData = this.submitData.bind(this);
    };
    componentDidMount() {
              this.props.getClientList((data)=>{
                  if (data){
                      this.props.authFailed()
                  }else{
                    this.setState({
                        clientList: this.props.clientList,
                    });
                  }
                
          });
        }
    handleShow() {
        this.setState({show: true})
    }
    handleClose() {
        this.setState({show: false})
    }
    

    submitData (done) {
        const item = {
            client_name: this.state.client,
            quantity: this.state.quantity,
            price: this.state.price,
            amount: this.state.amount,
            transaction_date: this.state.timestamp,
          };
          this.props.inputTransaction(item, (data) => {
            if (!data){
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
                  this.props.getSummary(()=> {console.log("success")});
                }
              );
            }else{
                this.props.authFailed()
            }
            
          });
          done()
    }
    handleItemSelect = (item) => {
        let data = {
            client: item
        }
        this.props.getClientPrice(data, ()=>{
            this.setState ({
                client: item,
                price: this.props.clientPrice.data
            })
        })
        
    }
    handleDateChange = (date) => {
        this.setState({
          date: date,
          timestamp: Date.parse(date),
        });
      };
    
    render() {
        return (
            <>
            <Button variant="primary" onClick={this.handleShow}>
              添加
            </Button>
      
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
            >
            <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>添加新购买记录</Modal.Title>
            </Modal.Header>

            <Modal.Body>
           
                <DropdownBox label = '客户' dropdownList = {this.state.clientList} dropdownName = {this.state.client} handleClick = {(item) => {this.handleItemSelect(item)}} />
                <InputArea label = "克数" amount = {this.state.quantity} change = {(event) => {this.setState({quantity: event.target.value, amount: (event.target.value * this.state.price).toFixed(1)})}} type = "inventory"/>
                <InputArea label = "价格" amount = {this.state.price} change = {(event) => {this.setState({price: event.target.value, amount: (event.target.value * this.state.quantity).toFixed(1)})}} type = "inventory"/>
                <InputArea label = "金额" amount = {this.state.amount} change = {(event) => {this.setState({amount: event.target.value})}} type = "inventory"/>
                <>
                <label className="col-md-12">日期</label>
                <br/>
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    className="kjga-input-box"
                  />
                  </>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>关闭</Button>
                <Button variant="primary" onClick ={ ()=> {this.submitData(this.handleClose)}}>保存</Button>
            </Modal.Footer>
            </Modal.Dialog>
            </Modal>
            </>
        )
    }


}
function mapStateToProps(state) {
    return {
      clientList: state.operations.clientList,
      clientPrice: state.operations.client_price,
      auth: state.auth.authenticated
    };
  }

export default compose(
    connect(mapStateToProps, {inputTransaction, getClientList, getSummary, getClientPrice})
)(PopupNewItem);