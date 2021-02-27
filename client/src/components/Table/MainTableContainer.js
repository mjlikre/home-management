import React, {useState, useEffect} from 'react'
import { compose } from "redux";
import { connect } from "react-redux"; 
import PopupNewItem from "../PopUp/index"
import MasterTable from "./Table"
import {Table} from "react-bootstrap"
import { useMediaQuery } from "react-responsive";
import GeneralTable from "./index"
import {
    getSummary,
  } from "../../actions/operations";
const MainTableContainer = (props) => {
  let mobile = useMediaQuery({query: "(max-width: 768px)"});
  
    const [data, setData] = useState(null);
    useEffect(()=> {
      if (!props.summary){
        props.getSummary(()=> {
          if (props.summary){
            setData(props.summary.data[1])
          }
        })
      }
      }, [])
    useEffect(()=> {
      if (props.summary !== data) {
        if (props.summary){
          setData(props.summary.data[1])
        }
      } 
    }, [props.summary])
    const renderQuantity = () => {
      if (props.summary) {
        let total = 0;
        props.summary.data[1].map((item, index) => {
          return (total += item.quantity);
        });
        return total;
      }
    };
    const renderAmount = () => {
      if (props.summary) {
        let total = 0;
        props.summary.data[1].map((item, index) => {
          return (total += item.amount);
        });
        return total;
      }
    };
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

    return (
        <>
          <div style = {{opacity: "0.8"}}>
          <div className="header-grid">
        {!mobile? (
           <h3>当前周期现有牛黄：{props.summary ? props.summary.data[0][0].quantity : null}克</h3>
        ) :
        (
          <h5>现有：{props.summary ? props.summary.data[0][0].quantity : null}克</h5>

        )}
        
        <div></div>
        <PopupNewItem />
      </div>
              <MasterTable item = {data}
              thead = {["客户","克数","价格","金额","日期"," "]} 
              firstRow = "client_name" secondRow = "quantity" thirdRow = "price" fourthRow = "amount"  main = {true} 
              mobileThead = {["客户","克数","价格","日期"," "]}
              mFirstRow = "client_name" mSecondRow = "quantity" mThirdRow = "price"  
              />
              {renderDetailsTable(data)}
              {!mobile ? (
        <div>
          <Table className="table table-bordered">
            <tbody className="thead-light">
              <tr>
                <th>购买克数：{renderQuantity()}</th>
                <th>购买金额：{renderAmount()}</th>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : null}
          </div>         
        </>
    )
}

function mapStateToProps(state) {
    return {
      summary: state.operations.summary,
      summaryError: state.operations.summaryError,
      clientList: state.operations.clientList,
      auth: state.auth.authenticated
    };
  }
export default compose(connect(mapStateToProps, {getSummary}))(MainTableContainer)
