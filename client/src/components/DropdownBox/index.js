import React from "react"; 
import { Dropdown } from "react-bootstrap";

const renderClients = props => {
    if (props.dropdownList) {
        return props.dropdownList.data.map((item, index) => {
          return (
            <Dropdown.Item key = {index} href="#/action-1" onClick={()=>{props.handleClick(item.client_name)}}>{item.client_name}</Dropdown.Item>
          )
        })
      }
}

const DropdownBox = props => {
    return (
       
            <div>
            <label >{props.label}</label>

                <div className="dropdown-container">
                <div >
                    <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        { props.dropdownName || "请选客户" }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {renderClients(props)}
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
                </div>
            </div>
       
    )
}

export default DropdownBox