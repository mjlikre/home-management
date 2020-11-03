import React, { Component } from "react";
import { compose } from "redux"
import { connect } from 'react-redux';
import Navbar from "./../components/NavBar"
import { getToday } from "./../actions/operations" 
import { Table } from "react-bootstrap";
import './../styling/main.css'

class Daily extends Component {
    constructor(props){
        super(props)
        this.state={
            data: null
        }
    }
    componentDidMount () {
        this.props.getToday(()=>{this.setState({
            data: this.props.today
        }, ()=>{console.log(this.props.today)})})
    }
    renderSummaryBox () {
        if (this.state.data) {
            return this.state.data.data.map((item, index) => {
              return (
                <tr>
                  <th>{item.client_name}</th>
                  <th>{item.quantity}</th>
                  <th>{item.price}</th>
                  <th>{item.amount}</th>
                </tr>
              );
            });
          }
    }
    renderQuantity () {
        if (this.state.data) {
            let total = 0
            this.state.data.data.map((item, index) => {
                total += item.quantity
            })
            return total
        }
    }
    renderAmount () {
        if (this.state.data) {
            let total = 0
            this.state.data.data.map((item, index) => {
                total += item.amount
            })
            return total
        }
    }
    render() {
        if (this.state.data){
            return(
                <div>
                    <Navbar navType="grocery" />
                    <div className="row">
                        <div className = "col-lg-1"></div>
                        <div className="kjga-display-block col-lg-10">
                            <div className="row">
                                <div
                                className="col-lg-12"
                                style={{ padding: "20px 0 20px 20px" }}
                                >
                                    <Table>
                                    <thead>
                                    <tr>
                                        <th className="paymentTable">客户</th>
                                        <th className="paymentTable">克数</th>
                                        <th className="paymentTable">价格</th>
                                        <th className="paymentTable">金额</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderSummaryBox()}
                                        <th>总结</th>
                                        <th>{this.renderQuantity()}</th>
                                        <th></th>
                                        <th>{this.renderAmount()}</th>
                                    </tbody>
                                    
                                </Table>

                                </div>
                                </div>
                                </div>
                                </div>
                </div>
            )
        }else{
            return(
                <div>
                    <Navbar navType="grocery" />
                    <div className="kjga-display-block col-lg-8"><h1>加载中，请稍等</h1></div>
                    
                </div>
            )
        }
        
    }

}

function mapStateToProps(state) {
    return{
        today: state.operations.daily,
        todayError: state.operations.dailyError
    }
}

export default compose(
    connect(mapStateToProps, { getToday })
)(Daily)