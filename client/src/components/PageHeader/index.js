import React from "react";
import NavBar from "../NavBar";
import i6 from "../../images/6.jpg";
const PageHeader = (props) => {

  return (
    <div>
      <NavBar
        navType={props.type ? props.type : "grocery"}
        navItems={props.items}
      />
      <div className="back-img" style={{ backgroundImage: `url(${i6})` }}>
        <div
          className={
            props.items
              ? "login-display-block "
              : "kjga-display-block "
          }
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
