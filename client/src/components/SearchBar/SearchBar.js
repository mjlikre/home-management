import React from 'react';
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
  if (props.type === "C"){
    return (
      <CInput 
       style={BarStyling}
       key="random1"
       value={props.input}
       placeholder={props.search}
       onInputChange={(e) => props.onChange(e.target.value)}
      />
    );
  }else if(props.type === "S") {
    return (
      <input 
       style={BarStyling}
       key="random1"
       value={props.input}
       placeholder={props.search}
       onChange={(e) => props.onChange(e.target.value)}
      />
    );
  }
  
}

export default SearchBar