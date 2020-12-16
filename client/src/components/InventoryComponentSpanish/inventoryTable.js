import React, {Component} from "react";

import { Table, Spinner } from "react-bootstrap";
import PopupEditS from "./popupEdit"
class inventoryTableS extends Component {
    
    
    renderTableComponents() {
        if (this.props.data) {
           
            return this.props.data.map((item, index) => {
                return (
                    <tr>
                        <th>{item.sname}</th>
                        <th>{item.quantity}</th>
                        <th>
                            <PopupEditS item = {item} />
                        </th>
                    </tr>
                )
            })   
        }
        return null
    }
    render(){
        return(
            <>
            
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableComponents()}
                    </tbody>
                </Table>
            </>
        )
    }
    
}

export default inventoryTableS;