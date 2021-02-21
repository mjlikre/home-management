import React from "react";
import { Table } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import RestoreButton from "./RestoreButton"
const DeletedTable = (props) => {
  let mobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div style = {{opacity: "0.8"}}>
      <div className="table-wrapper" style = {!mobile ? (null) : ({height: "500px"})}>
        {!mobile ? (
          <Table striped bordered>
            <thead className="thead-dark">
              <tr>
                <th className="paymentTable">客户</th>
                <th className="paymentTable">克数</th>
                <th className="paymentTable">价格</th>
                <th className="paymentTable">金额</th>
                <th className="paymentTable">日期</th>
                <th className="paymentTable"></th>
              </tr>
            </thead>

            <tbody>
              {props.item
                ? props.item.data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.client_name}</th>
                        <th>{item.quantity}</th>
                        <th>{item.price}</th>
                        <th>{item.amount}</th>
                        <th>
                          {(new Date(item.transaction_date).getMonth()+1) + "/"+ (new Date(item.transaction_date).getDate()) }
                        </th>
                        <th>
                          <RestoreButton item = {item}/>
                        </th>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        ) : (
          <table className="main-table">
            <thead className="thead-dark">
              <tr>
                <th className="paymentTable">客户</th>
                <th className="paymentTable">价格</th>
                <th className="paymentTable">克数</th>
                <th className="paymentTable">日期</th>
                <th className="paymentTable"></th>
              </tr>
            </thead>

            <tbody>
              {props.item
                ? props.item.data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.client_name}</th>
                        <th>{item.price}</th>
                        <th>{item.quantity}</th>
                        <th>
                        {(new Date(item.transaction_date).getMonth()+1) + "/"+ (new Date(item.transaction_date).getDate()) }
                          
                          
                        </th>
                        <th>
                         <RestoreButton item = {item}/>
                        </th>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        )}
      </div>
      
    </div>
  );
};

export default DeletedTable;
