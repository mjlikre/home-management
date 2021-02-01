import React, {useState, useEffect} from 'react'
import { compose } from "redux";
import { connect } from "react-redux"; 
import MainTable from "./MainTable";
import {
    getSummary,
  } from "../../actions/operations";


const MainTableContainer = (props) => {
    const [data, setData] = useState(null);
    useEffect(()=> {
      if (!props.summary){
        props.getSummary(()=> {
            setData(props.summary)
        })
      }
      }, [])
    useEffect(()=> {
      if (props.summary !== data) {
        if (props.summary){
          setData(props.summary)
        }
       
      }
    }, [props.summary])
    
    return (
        <>
        
                  <MainTable item = {data}/>
                    
        </>
    )
}

function mapStateToProps(state) {
    return {
      summary: state.operations.summary,
      summaryError: state.operations.summaryError,
      clientList: state.operations.clientList,
      auth: state.auth.authenticated
    };
  }
export default compose(connect(mapStateToProps, {getSummary}))(MainTableContainer)
