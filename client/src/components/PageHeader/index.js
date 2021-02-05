import React from "react";
import NavBar from "../NavBar";
import i1 from "../../images/1.jpg";
import i2 from "../../images/2.jpg";
import i3 from "../../images/3.jpg";
import i4 from "../../images/4.jpg";
import i5 from "../../images/5.jpg";
import i6 from "../../images/6.jpg";
import i7 from "../../images/7.jpg";
import i8 from "../../images/8.jpg";
const PageHeader = (props) => {
  const images = [i1, i2, i3, i4, i5, i6, i7, i8]
  return (
    <div>
      <NavBar
        navType={props.type ? props.type : "grocery"}
        navItems={props.items}
      />
      <div className="back-img" style={{ backgroundImage: `url(${images[Math.floor(Math.random() * images.length)]})` }}>
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
