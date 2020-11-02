import React from 'react';
import Navbar from "./../components/NavBar/index";
export default ({ children }) => {
  return (
    <div>
      <Navbar navType="grocery" />
      {children}
    </div>
  )
};
