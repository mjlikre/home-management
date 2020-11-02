import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./General.css";

class GeneralTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_list: [],
    };
  }
  componentDidMount() {
    if (this.props.itemList) {
      this.setState({
        item_list: this.props.itemList
      })
    }
  }
  renderButton(item) {
    if (item.edit === 0) {
      return (
        <div className = "button-wrapper">
          <div className = "button">
            <a href={"/gl?id=" + item.id + "&date=" + item.shop_date.replace(" ", "_").split(",")[0] }>View</a>
          </div>
        </div>
        
      )
    }
    else if (item.edit === 1) {
      return (
        <div className = "button-wrapper">
          <div className = "button"><a href={"/gl?id=" + item.id + "&total=" + item.total  + "&date=" + item.shop_date.replace(" ", "_").split(",")[0]}>View</a></div>
          
          <div className = "button"><a href={"gle?id="+item.id + "&total=" + item.total  + "&date=" + item.shop_date.replace(" ", "_").split(",")[0]}>Edit</a></div>
        </div>

      )
    } 
 
  }
  renderItem() {
    if (this.state.item_list.length !== 0) {
      let item_list = this.state.item_list

      return item_list.map((item, index) => {
        return (
          <div className="col-md-4 ">
            
            <Card style={{ width: '18rem', height: "12rem"}}>
              
              <Card.Body>
                <Card.Title>{item.store} - {item.shop_date}</Card.Title>
                <Card.Text>
                  <div>Shopper: {item.shopper}</div>
                  <div>Total: {item.total}</div>
                </Card.Text>
                {this.renderButton(item)}
              </Card.Body>
            </Card>
              
            {/* </a> */}
            
          </div>
        );
      });
    } else {
      return <div>We got nothing dude, sorry</div>;
    }
  }
  render() {
    return (
      <div className="kjga-wrapper">
        <div className="kjga-outer-container">
          <div className="container kjga-container">
            <div className="jumbotron kjga-box">
              <h2>{this.props.name}</h2>
              <div className="row container">{this.renderItem()}</div>
              <br />
              <br />
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GeneralTable;
