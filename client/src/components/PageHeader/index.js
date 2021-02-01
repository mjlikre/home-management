import React from "react";
import NavBar from "../NavBar";
import y from "../../images/6.jpg";

const PageHeader = (props) => {
  return (
    <div>
      <NavBar
        navType={props.type ? props.type : "grocery"}
        navItems={props.items}
      />
      <div className="back-img" style={{ backgroundImage: `url(${y})` }}>
        <div
          className={
            props.items
              ? "login-display-block col-lg-10"
              : "kjga-display-block col-lg-10"
          }
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
