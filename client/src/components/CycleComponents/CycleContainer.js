import React, {useEffect, useState} from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import CycleSelect from "./CycleSelect"
import {
    cycles,
    currentCycle,
    specificCycle,
    salesSummary,
    editSalesRecord,
  } from "../../actions/operations";
import GeneralTable from "../Table"
import GeneralButton from "../Button/GeneralButton"

const CycleContainer = (props) => {
    const [list, setList] = useState(null)
    const [data, setData] = useState(null)
    const [editData, setEditData] = useState({
      quantity: "",
      amount: "",
      edit: 0,
    })
    const [cleanedData, setCleanedData] = useState(null)
    
    useEffect(()=> {
      if (!props.cycleList) {
        props.cycles(()=> {
          setList(props.cycleList)
        })
      }
      if (data !== props.sCycle) {
        setData(props.sCycle.data)
        handleSpecificCycle(props.sCycle.data)
      }
    }, [props.sCycle])

    const handleSpecificCycle = (data) => {
      if (data){
        let cleaned = [];
        data.map((item, index) => {
            return cleaned.push([
              item.client_name,
              item.quantity,
              item.price,
              item.amount,
              new Date(item.transaction_date).toLocaleDateString(),
            ]);
          });
          return cleaned
        } 
      }
    
    const returnProfit = () => {
      if (data) {
        return data[0].cash - renderAmount();
      } else {
        return 0;
      }
    }
    const returnSales = () => {
      if (data) {
        return data[0].cash;
      } else {
        return 0;
      }
    }
    const returnSalesAmount = () => {
      if (data) {
        return data[0].quantity_sold;
      } else {
        return 0;
      }
    }
    const renderQuantity = () => {

      if (data) {

        let total = 0;
        data.map((item, index) => {
          return total += item.quantity;
        });
        return total.toFixed(2);
      } else {
        return 0;
      }
    }
    const renderAmount = () => {
      if (data) {
        let total = 0;
        data.map((item, index) => {
          return total += item.amount;
        });
        return total.toFixed(2);
      } else {
        return 0;
      }
    }
    const calculateDetails = (data) => {
      if (data) {
        const details = {};
        const cleaned_data = [];
        for (let i = 0; i < data.length; i++) {
          if (!details.hasOwnProperty(data[i].client_name)) {
            details[data[i].client_name] = {
              amount: data[i].amount,
              quantity: data[i].quantity,
            };
          } else {
            details[data[i].client_name].amount += data[
              i
            ].amount;
            details[data[i].client_name].quantity += data[
              i
            ].quantity;
          }
        }
        let cleaned = Object.entries(details);
        cleaned.map((item, index) => {
          return cleaned_data.push([item[0], item[1].quantity, item[1].amount]);
        });
        return cleaned_data;
      }
    }
    const handleEdit =(data)=> {
      setEditData({...editData, quantity: data.quantity_sold, amount: data.cash, edit: 1})
    }
    const renderSales = () => {
      if (data) {
        return (
          <tr>
            <th>出售</th>
            <th>出售克数：{data[0].quantity_sold}</th>
            <th>出售金额：{data[0].cash}</th>
            <th>
              <button
                onClick={() => {
                  handleEdit(data[0]);
                }}
              >
                编辑
              </button>
            </th>
          </tr>
        );
      }
    }
    const renderDetailsTable = (data) => {
      if (data) {
        let cleaned = calculateDetails(data);

        return (
          <GeneralTable
            item_name={["客户", "克数", "金额"]}
            item_list={cleaned}
          ></GeneralTable>
        );
      }
    }
    const handleFinalEdit = () => {
      this.props.editSalesRecord(
        { id: data[0].cycle_id, amount: editData.amount },
        () => {
         
          setEditData ({...editData, amount: '', edit: 0, quantity: ""})
        
        }
      );
    }
    return (
        <>
        {!editData.edit ? 
        (
          <>
          <CycleSelect list = {props.cycleList} />
          <div
                  className="col-lg-12 table-wrapper"
                >
              <GeneralTable
                item_list={[
                  [
                    `购买克数：${renderQuantity()}`,
                    `出售克数：${returnSalesAmount()}`,
                    `购买金额：${renderAmount()}`,
                    `出售金额：${returnSales()}`,
                    `利润：${returnProfit()}`
                    
                  ],
                ]}
                
              />
              <GeneralTable
                item_name={["客户", "克数", "价格", "金额", "日期"]}
                item_list={handleSpecificCycle(data)}
              >
                {renderSales()}
              </GeneralTable>
              {renderDetailsTable(data)}
              </div></>
              ) : (
                <div className="row">
                <div
                  className="col-lg-12"
                 
                >
                  <div className="row">
                    <div className="col-md-2">
                      <label className="col-md-12">克数</label>
                      <input
                        className="col-md-12 kjga-input-box"
                        type="number"
                        value={editData.quantity}
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="col-md-12">金额</label>
                      <input
                        className="col-md-12 kjga-input-box"
                        type="number"
                        value={editData.amount}
                        onChange={(event) => {
                          setEditData({...editData, amount: event.target.value})
                        }}
                      />
                    </div>
                    <div className="col-md-2">
                      <div className="col-md-12">
                        <br></br>{" "}
                      </div>
                      <div className="col-md-12">
                        <GeneralButton
                          type="primary"
                          buttonName="编辑"
                          handleClick={handleFinalEdit}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
        </>
    )
}

function mapStateToProps(state) {
    return {
      cycleList: state.operations.cycleList,
      cCycle: state.operations.currentCycle,
      sCycle: state.operations.specificCycle,
      cycleError: state.operations.cycleError,
      sales: state.operations.sales,
      auth: state.auth.authenticated,
    };
  }
  

export default compose(connect(mapStateToProps, {cycles, currentCycle, specificCycle, salesSummary, editSalesRecord}))(CycleContainer);
