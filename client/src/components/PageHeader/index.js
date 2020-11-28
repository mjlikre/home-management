import React from 'react';
import NavBar from "../NavBar"

const PageHeader = props => {
  return (
      <div>
          <NavBar navType = "grocery"/>
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="kjga-display-block col-lg-10">
                {props.children}
            </div>
        </div>
      </div>
  )
};

export default PageHeader;