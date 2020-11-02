import React, { Component } from "react";
import "./General.css"

class GeneralTemplate extends Component {
    render() {
        return (
            <div className="kjga-wrapper">
              <div className="kjga-outer-container">
                <div className="container kjga-container">
                  <div className="jumbotron kjga-box">
                    <h2>{this.props.name}</h2>
                    <div className="row container">
                        {this.props.children}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
    }
}

export default GeneralTemplate;