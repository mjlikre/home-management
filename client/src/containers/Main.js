import React, {useEffect} from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import PageHeader from "./../components/PageHeader"
import MainTableContainer from "../components/Table/MainTableContainer"

import "react-datepicker/dist/react-datepicker.css";
import "./../styling/main.css";
const Main = (props) =>  {

  
  useEffect(()=>{
    if (!props.auth){
      props.history.push("/signin")
    }
  }, [props.auth])




      return (
        <PageHeader>
          
                  <MainTableContainer/>

              
              
          </PageHeader>
      );
    
  
}
function mapStateToProps(state) {
  return {

    auth: state.auth.authenticated
  };
}
export default compose(
  connect(mapStateToProps, null)
)(Main);
