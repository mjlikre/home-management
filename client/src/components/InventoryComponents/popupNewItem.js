import React, {Component} from "react";
import { compose } from "redux";
import { connect } from "react-redux"; 
import { Modal, Button } from "react-bootstrap"
import {newInventory} from "../../actions/inventory"
import InputArea from "../InputArea"
class PopupNewItem extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: null,
            quantity: null,
            id: null, 
            price: null,
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
    

    submitData (done) {
        
        let data = {
            cname: this.state.name,
            quantity: this.state.quantity,
            id: this.state.id, 
            price: this.state.price,
            
        }
        this.props.newInventory(data)
        done()
    }
    
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
                <Modal.Title>编辑: {this.state.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputArea label = "名称" amount = {this.state.name} change = {(event) => {this.setState({name: event.target.value})}} type = "inventory" style = "text"/>
                <InputArea label = "数量" amount = {this.state.quantity} change = {(event) => {this.setState({quantity: event.target.value})}} type = "inventory" style = "number"/>
                <InputArea label = "价格" amount = {this.state.price} change = {(event) => {this.setState({price: event.target.value})}} type = "inventory" style = "number"/>
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
    connect(null, {newInventory})
)(PopupNewItem);