import React, { Component } from 'react';
import { signout } from "../actions";
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";


class Signout extends Component {
    componentDidMount(){
        this.props.signout();
    }
    render(){
        return(
            <div className='container'>
                <Redirect to='/signin'/>
            </div>

        )

    }
}
export default connect(null, { signout })(Signout);