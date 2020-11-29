import React from "react";
import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./General.css";

const renderThead = (item_name) => {
  if (item_name) {
    return item_name.map((item, index) => {
      return <th className="paymentTable">{item}</th>;
    });
  }
};
const renderTbody = (item_list) => {
  if (item_list) {
    return item_list.map((item, index) => {
      return <tr>{renderIndividualItems(item)}</tr>;
    });
  }
};
const renderIndividualItems = (item) => {
  return item.map((item, index) => {
    return <th className="paymentTable">{item}</th>;
  });
};
const GeneralTable = (props) => {
  return (
    <div className="row">
      <div className="col-lg-12" style={{ padding: "20px 0 20px 20px" }}>
        <Table striped bordered hover>
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
