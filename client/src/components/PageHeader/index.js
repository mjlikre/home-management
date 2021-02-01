import React, {useState} from 'react';
import NavBar from "../NavBar"
import m from "../../images/4.jpg";
import o from "../../images/1.jpg";
import n from "../../images/2.jpg";
import d from "../../images/3.jpg";
import a from "../../images/5.jpg";
import y from "../../images/6.jpg";
import ay from "../../images/7.jpg";
import day from "../../images/8.jpg";
const PageHeader = props => {
  const [images, setImage] = useState([m, o, n, d, a, y, ay, day])
  return (
      <div>
          <NavBar navType = "grocery"/>
    <div className = "back-img">
     <div className="kjga-display-block col-lg-10" >
            
                {props.children}
            </div>
  
    </div>

            
         
           
        
      </div>
  )
};

export default PageHeader;