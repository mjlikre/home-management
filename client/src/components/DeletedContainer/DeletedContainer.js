import React, {useEffect} from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import {getDeleted} from "../../actions/operations"
import DeletedTable from "./DeletedTable"
const DeletedContainer = (props) => {
    useEffect(()=> {
        if(!props.deleted){
            props.getDeleted()
        }
    }, [])
    
    return (
        <div>
            <DeletedTable item = {props.deleted} />
        </div>
    )
}
function mapStateToProps(state) {
    return {
        deleted : state.operations.deleted
    };
}
export default compose(connect(mapStateToProps, {getDeleted})) (DeletedContainer)
