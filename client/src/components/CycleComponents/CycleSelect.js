import React from "react";
import { Dropdown } from "react-bootstrap"
import { compose } from "redux";
import { connect } from "react-redux";
import {
  specificCycle
} from "../../actions/operations";
const handleCycleList = (item, props) => {
    props.specificCycle(
        { start_date: item.start_date, end_date: item.end_date },
        () => {
          console.log("good")
        }
      );
}
const renderDropDown = (props) => {
  if (props.list) {
    return props.list.data.map((item, index) => {
      if (item.end_date !== 0) {
        return (
          <Dropdown.Item
            href="#/action-1"
            key={index}
            onClick={() => {
              handleCycleList(item, props);
            }}
          >
            {item.cycle_number}
          </Dropdown.Item>
        );
      } else {
        return null;
      }
    });
  }
};
const CycleSelect = (props) => {
  return (
    <div className="dropdown-container">
      <div className="col-md-6">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            请选周期
          </Dropdown.Toggle>
          <Dropdown.Menu>{renderDropDown(props)}</Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default compose(connect(null, {specificCycle}))(CycleSelect);
