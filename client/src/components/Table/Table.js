import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import DeleteButton from "../Button/DeleteButton";
import RestoreButton from "../Button/RestoreButton"
import { useMediaQuery } from "react-responsive";
const MasterTable = (props) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (props.item) {
      setItem(props.item);
    }
    
  }, [props.item]);

  let mobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
      <div className="table-wrapper" style = {!mobile ? (null) : ({height: "500px"})}>
        {!mobile ? (
          <Table striped bordered>
            <thead className="thead-dark">
              <tr>
                  {
                      props.thead ? (props.thead.map((item, index) => {
                          return(
                        <th className="paymentTable" key = {index}>{item}</th>
                        )
                      }))
                      :
                      null
                  }
              </tr>
            </thead>

            <tbody>
              {item
                ? item.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item[props.firstRow]}</th>
                        <th>{item[props.secondRow]}</th>
                        <th>{item[props.thirdRow]}</th>
                        {props.fourthRow ? <th>{item[props.fourthRow]}</th> : null}
                        {props.fifthRow ? <th>{item[props.fifthRow]}</th> : null}
                        {props.sixthRow ? <th>{item[props.sixthRow]}</th> : null}
                        <th>
                          {(new Date(item.transaction_date).getMonth()+1) + "/"+ (new Date(item.transaction_date).getDate()) }
                        </th>
                        
                        {props.main ? <th><DeleteButton item={item}/></th> : null}
                        {props.deleted ? <th><RestoreButton item={item}/></th> : null}
                          
                        
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
                  {
                      props.mobileThead ? (props.mobileThead.map((item, index) => {
                          return(
                        <th className="paymentTable" key = {index}>{item}</th>
                          )
                      }))
                      :
                      null
                  }
              </tr>
            </thead>

            <tbody>
            {item
                ? item.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item[props.mFirstRow]}</th>
                        <th>{item[props.mSecondRow]}</th>
                        <th>{item[props.mThirdRow]}</th>
                        {props.mForthRow ? <th>{item[props.mForthRow]}</th> : null}
                        {props.mFifthRow ? <th>{item[props.mFifthRow]}</th> : null}
                        <th>
                          {(new Date(item.transaction_date).getMonth()+1) + "/"+ (new Date(item.transaction_date).getDate()) }
                        </th>
                        
                        {props.main ? <th><DeleteButton item={item}/></th> : null}
                        {props.deleted ? <th><RestoreButton item={item}/></th> : null}
                          
                        
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        )}
      </div>
      
    
  );
};

export default MasterTable;
