import React from "react";
import { Table } from "react-bootstrap";
import "./General.css";

const renderThead = (item_name) => {
  if (item_name) {
    return item_name.map((item, index) => {
      return <th className = "paymentTable">{item}</th>;
    });
  }
};
const renderTbody = (item_list) => {
  if (item_list) {
    return item_list.map((item, index) => {
      return <tr key = {index}>{renderIndividualItems(item)}</tr>;
    });
  }
};
const renderIndividualItems = (item) => {
  return item.map((item, index) => {
    return <td className="paymentTable">{item}</td>;
  });
};
const GeneralTable = (props) => {
  return (
    <div className="row table-wrapper">
      <div className="col-lg-12" >
        <Table striped bordered hover size = "sm">
          <thead className="thead-dark">
            <tr>{renderThead(props.item_name)}</tr>
          </thead>
          <tbody>{renderTbody(props.item_list)}</tbody>
          {props.children}
        </Table>
      </div>
    </div>
  );
};
export default GeneralTable;
