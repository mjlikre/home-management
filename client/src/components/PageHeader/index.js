import React from 'react';
import NavBar from "../NavBar"

const PageHeader = props => {
  return (
      <div>
          <NavBar navType = "grocery"/>
          
            <div className="kjga-display-block col-lg-10">
                {props.children}
            </div>
        
      </div>
  )
};

export default PageHeader;