import React, {useEffect, useState} from 'react'
import { connect } from "react-redux";
import { compose } from "redux"
import { Table } from "react-bootstrap"
import {
    salesSummary,
    deleteSales,
  } from "../../actions/operations";
const SalesContainer = (props) => {
    const [data, setData] = useState(null)
    useEffect(()=> {
        if(!data) {
            props.salesSummary(()=>{
                setData(props.sales)
            })
        }else if(data !== props.sales) {
            setData(props.sales)
        }
        
    }, [props.sales])
    const renderSummaryBox = () => {
        if (data) {
          return data.data.map((item, index) => {
            return (
              <tr>
                <th></th>
                <th>{item.quantity_sold}</th>
                <th>{item.cash}</th>
                <th>{new Date(item.date_sold).toLocaleDateString()}</th>
                <th>
                  <button
                    className="cancel-button"
                    onClick={() => {
                      handleDelete(item);
                    }}
                  >
                    删除
                  </button>
                </th>
              </tr>
            );
          });
        }
      }
      const renderQuantity = () => {
        if (data) {
          let total = 0;
          data.data.map((item, index) => {
            return total += item.quantity_sold;
          });
          return total;
        }
      }
      const renderAmount = () => {
        if (data) {
          let total = 0;
          data.data.map((item, index) => {
            return total += item.cash;
          });
          return total;
        }
      }
      const handleDelete = (item) => {
        const data = {
          id: item.id,
          amount: item.cash,
          quantity:item.quantity_sold,
        };
        props.deleteSales(data, (data) => {
          
          props.salesSummary(() => {
            setData(props.sales)
          });
        
        });
      }
    return (
        <div className="table-wrapper">
                
                  <Table className = "table table-striped table-bordered table-hover">
                    <thead className = "thead-dark">
                      <tr >
                        <th className="paymentTable"></th>
                        <th className="paymentTable">克数</th>
                        <th className="paymentTable">金额</th>
                        <th className="paymentTable">日期</th>
                        <th className="paymentTable"></th>
                      </tr>
                    </thead>
                    <tbody >
                      {renderSummaryBox()}
                      <th className = "thead-light">总结</th>
                      <th className = "thead-light">{renderQuantity()}</th>
                      <th className = "thead-light">{renderAmount()}</th>
                    </tbody>
                  </Table>
                </div>
    )
}

function mapStateToProps(state) {
    return {
      sales: state.operations.sales,
      salesError: state.operations.salesError,
      auth: state.auth.authenticated
    };
  }
  
export default compose(connect(mapStateToProps, {salesSummary, deleteSales})(SalesContainer));
