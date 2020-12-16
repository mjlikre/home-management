import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import InventoryTable from "../components/InventoryComponents/inventoryTable";
import SearchBar from "../components/SearchBar/SearchBar";
import PopupNewItem from "../components/InventoryComponents/popupNewItem";
import InventoryTableS from "../components/InventoryComponentSpanish/inventoryTable";
import PopupNewItemS from "../components/InventoryComponentSpanish/popupNewItem";
import Footer from "../components/StickyFooter/Footer"
import { getInventory } from "./../actions/inventory";
import { Button } from "react-bootstrap"
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultList: null,
      dataList: null,
      specified: null,  
      version: 0
    };
  }

  componentDidMount() {
    this.props.getInventory(() => {
      this.setState({
        defaultList: this.props.inventory.data,
        dataList: this.props.inventory.data,
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inventory !== this.props.inventory) {
      this.setState({defaultList: this.props.inventory, dataList: this.props.inventory.data})
    }
  }
  updateInput = async (input) => {
    const filtered = await this.state.defaultList.filter((data) => {
        if (this.state.version) {
            return data.sname.includes(input);
        }
        else{
            return data.cname.includes(input);
        }
      
    });

    this.setState({
      specified: input,
      dataList: filtered,
    });
  };
  
  render() {
      if (this.state.version === 0) {
        return (
            <div className="container">
              <div className="row">
                <div className="col-sm-1"/>
                <div className="col-sm-10">
                <br/>
                  <SearchBar
                    input={this.state.specified}
                    onChange={this.updateInput}
                    search = "搜索"
                    type = "C"
                  />
                  <br/><br/>
                  <InventoryTable
                    data={this.state.dataList}
        
                  />
                </div>
              </div>
              <Footer>
                <div style = {{display: "grid", gridTemplateColumns: "10% 35% 10% 35% 10%"}}>
                    <div/>
                    <PopupNewItem/>
                    <div/>
                    <Button onClick ={() => {this.setState({version:1})}}>Español</Button>
                    <div/>
                </div>
                      
              </Footer>
            </div>
          );
      }
      else if(this.state.version === 1) {
        return (
            <div className="container">
              <div className="row">
                <div className="col-sm-1"/>
                <div className="col-sm-10">
                <br/>
                  <SearchBar
                    input={this.state.specified}
                    onChange={this.updateInput}
                    search = "Buscar"
                    type = "S"
                  />
                  <br/><br/>
                  <InventoryTableS
                    data={this.state.dataList}
        
                  />
                </div>
              </div>
              <Footer>
                  
                  <div style = {{display: "grid", gridTemplateColumns: "10% 35% 10% 35% 10%"}}>
                  <div/>
                      <PopupNewItemS/>
                      <div/>
                      <Button onClick ={() => {this.setState({version:0})}}>中文</Button>
                      <div/>
                  </div>
              </Footer>          
            </div>
          );
      }
    
  }
}
function mapStateToProps(state) {
  return {
    inventory: state.inventory.inventory,
    err: state.inventory.inventoryErr,
  };
}
export default compose(connect(mapStateToProps, { getInventory }))(Inventory);
