import React, { useState } from 'react';
import CInput from 'react-composition-input';
const SearchBar = (props) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  // const [inputLock, setInputLock] = useState(false);
  // const [value, setValue] = useState(null)
  // const handleChinese = (e) => {
  //   let string = "";
  //   if (inputLock) {
  //     console.log(e)
  //     string += e.substr(e.length - 1).toUpperCase();
  //     console.log(string)
      
  //     setInputLock(false)
  //   }
  // }
  return (
    <CInput 
     style={BarStyling}
     key="random1"
     value={props.input}
     placeholder={"搜索"}
     onInputChange={(e) => props.onChange(e.target.value)}
    />
  );
}

export default SearchBar