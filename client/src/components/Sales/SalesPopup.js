import React, {Component} from "react";
import { compose } from "redux";
import { connect } from "react-redux"; 
import { Modal, Button } from "react-bootstrap"
import {insertSales, salesSummary} from "../../actions/operations"
import DatePicker from "react-datepicker";
import InputArea from "../InputArea"
class SalesPopop extends Component {
    constructor(props){
        super(props);
        this.state ={
            date: null,
            quantity: null,
            amount: null,
            timestamp: null,
            show: false

        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.submitData = this.submitData.bind(this);
    };

    handleShow() {
        this.setState({show: true})
    }
    handleClose() {
        this.setState({show: false})
    }
    

    submitData(done) {
        const item = {
          quantity: this.state.quantity,
          amount: this.state.amount,
          timestamp: this.state.timestamp,
        };
        this.props.insertSales(item, () => {
          
          this.setState(
            {
              date: "",
              quantity: "",
              amount: "",
              timestamp: "",
            },
            () => {
              this.props.salesSummary(() => {
                console.log("success");
              });
            }
          );
          
        });
        done()
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
                <Modal.Title>添加新出售记录</Modal.Title>
            </Modal.Header>

            <Modal.Body>
           
                
                <InputArea label = "克数" amount = {this.state.quantity} change = {(event) => {this.setState({quantity: event.target.value})}} type = "inventory"/>
              
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


export default compose(
    connect(null, {insertSales, salesSummary})
)(SalesPopop);