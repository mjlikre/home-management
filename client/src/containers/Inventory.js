import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import InventoryTable from "../components/InventoryComponents/inventoryTable";
import SearchBar from "../components/SearchBar/SearchBar";
import PopupNewItem from "../components/InventoryComponents/popupNewItem";
import { getInventory } from "./../actions/inventory";
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultList: null,
      dataList: null,
      specified: null
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
      return data.cname.includes(input);
    });

    this.setState({
      specified: input,
      dataList: filtered,
    });
  };
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <SearchBar
              input={this.state.specified}
              onChange={this.updateInput}
            />
            <InventoryTable
              data={this.state.dataList}
  
            />
          </div>
        </div>
        <PopupNewItem />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    inventory: state.inventory.inventory,
    err: state.inventory.inventoryErr,
  };
}
export default compose(connect(mapStateToProps, { getInventory }))(Inventory);
