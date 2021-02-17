import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import PopupNewItem from "./../PopUp";
import DeleteButton from "./../DeleteButton";
import { useMediaQuery } from "react-responsive";
const MainTable = (props) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (props.item) {
      setItem(props.item);
    }
  }, [props.item]);

  let mobile = useMediaQuery({ query: "(max-width: 768px)" });
  const renderQuantity = () => {
    if (item) {
      let total = 0;
      item.data[1].map((item, index) => {
        return (total += item.quantity);
      });
      return total;
    }
  };
  const renderAmount = () => {
    if (item) {
      let total = 0;
      item.data[1].map((item, index) => {
        return (total += item.amount);
      });
      return total;
    }
  };
  return (
    <div style = {{opacity: "0.8"}}>
      <div className="header-grid">
        {!mobile? (
           <h3>当前周期现有牛黄：{item ? item.data[0][0].quantity : null}克</h3>
        ) :
        (
          <h5>现有：{item ? item.data[0][0].quantity : null}克</h5>

        )}
        
        <div></div>
        <PopupNewItem />
      </div>
      

      <div className="table-wrapper">
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
              {item
                ? item.data[1].map((item, index) => {
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
                          <DeleteButton item={item} />
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
              {item
                ? item.data[1].map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.client_name}</th>
                        <th>{item.price}</th>
                        <th>{item.quantity}</th>
                        <th>
                        {(new Date(item.transaction_date).getMonth()+1) + "/"+ (new Date(item.transaction_date).getDate()) }
                          
                          
                        </th>
                        <th>
                          <DeleteButton item={item} />
                        </th>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        )}
      </div>
      {!mobile ? (
        <div>
          <Table className="table table-bordered">
            <tbody className="thead-light">
              <tr>
                <th>购买克数：{renderQuantity()}</th>
                <th>购买金额：{renderAmount()}</th>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : null}
    </div>
  );
};

export default MainTable;
