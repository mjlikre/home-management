import React, {useEffect, useState} from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import {getDeleted} from "../../actions/operations"
import MasterTable from "../Table/Table"
const DeletedContainer = (props) => {
    const [data, setData] = useState()
    useEffect(()=> {
        if(!props.deleted){
            props.getDeleted()
        }else{
            setData(props.deleted.data)
        }
    }, [props.deleted])
    
    
    return (
        <div>
            <MasterTable item = {data} 
              thead = {["客户","克数","价格","金额","日期"," "]} 
              firstRow = "client_name" secondRow = "quantity" thirdRow = "price" fourthRow = "amount"  deleted = {true}
              mobileThead = {["客户","克数","价格","日期"," "]}
              mFirstRow = "client_name" mSecondRow = "quantity" mThirdRow = "price"  
              />
        </div>
    )
}
function mapStateToProps(state) {
    return {
        deleted : state.operations.deleted
    };
}
export default compose(connect(mapStateToProps, {getDeleted})) (DeletedContainer)
