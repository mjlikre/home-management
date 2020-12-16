import React, {Component} from "react";
import { compose } from "redux";
import { connect } from "react-redux"; 
import { Modal, Button } from "react-bootstrap"
import {newInventory} from "../../actions/inventory"
import InputArea from "../InputArea"
class PopupNewItemS extends Component {
    constructor(props){
        super(props);
        this.state ={
            cname: "",
            sname: "",
            quantity: 0,
            id: "", 
            price: 0,
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
            cname: this.state.cname,
            sname: this.state.sname,
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
            Agregar
            </Button>
      
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
            >
            <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Agregar articulo nuevo</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <InputArea label = "Nombre" amount = {this.state.sname} change = {(event) => {this.setState({sname: event.target.value})}} type = "inventory" style = "text"/>
                <InputArea label = "Cantidad" amount = {this.state.quantity} change = {(event) => {this.setState({quantity: event.target.value})}} type = "inventory" style = "number"/>
                <InputArea label = "Precio" amount = {this.state.price} change = {(event) => {this.setState({price: event.target.value})}} type = "inventory" style = "number"/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>Cerrar</Button>
                <Button variant="primary" onClick ={ ()=> {this.submitData(this.handleClose)}}>Guardar</Button>
            </Modal.Footer>
            </Modal.Dialog>
            </Modal>
            </>
        )
    }


}

export default compose(
    connect(null, {newInventory})
)(PopupNewItemS);