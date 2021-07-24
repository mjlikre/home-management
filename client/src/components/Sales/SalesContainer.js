import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Table } from "react-bootstrap";
import { salesSummary } from "../../actions/operations";
const SalesContainer = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!props.sales) {
      props.salesSummary(() => {
        console.log("hell yeah");
      });
    } else if (data !== props.sales) {
      setData(props.sales);
    }
  }, [props.sales]);
  const renderSummaryBox = () => {
    if (props.sales) {
      return props.sales.data.map((item, index) => {
        return (
          <tr>
            <th></th>
            <th>{item.quantity_sold}</th>
            <th>{item.cash}</th>
            <th>{new Date(item.date_sold).toLocaleDateString()}</th>
          </tr>
        );
      });
    }
  };
  const renderQuantity = () => {
    if (props.sales) {
      let total = 0;
      props.sales.data.map((item, index) => {
        return (total += item.quantity_sold);
      });
      return total;
    }
  };
  const renderAmount = () => {
    if (props.sales) {
      let total = 0;
      props.sales.data.map((item, index) => {
        return (total += item.cash);
      });
      return total;
    }
  };
  return (
    <div className="table-wrapper">
      <Table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th className="paymentTable"></th>
            <th className="paymentTable">克数</th>
            <th className="paymentTable">金额</th>
            <th className="paymentTable">日期</th>
          </tr>
        </thead>
        <tbody>
          {renderSummaryBox()}
          <th className="thead-light">总结</th>
          <th className="thead-light">{renderQuantity()}</th>
          <th className="thead-light">{renderAmount()}</th>
        </tbody>
      </Table>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    sales: state.operations.sales,
    salesError: state.operations.salesError,
    auth: state.auth.authenticated,
  };
}

export default compose(
  connect(mapStateToProps, { salesSummary })(SalesContainer)
);
