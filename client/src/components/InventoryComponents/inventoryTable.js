import React, {Component} from "react";
import {compose} from "redux"
import {connect} from "react-redux"
import { Table, Spinner } from "react-bootstrap";
import PopupEdit from "./popupEdit"
class inventoryTable extends Component {
    
    
    renderTableComponents() {
        if (this.props.data) {
           
            return this.props.data.map((item, index) => {
                return (
                    <tr>
                        <th>{item.cname}</th>
                        <th>{item.quantity}</th>
                        <th>
                            <PopupEdit item = {item} />
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
            
                <Table>
                    <thead>
                        <tr>
                            <th>名字</th>
                            <th>数量</th>
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

export default inventoryTable;