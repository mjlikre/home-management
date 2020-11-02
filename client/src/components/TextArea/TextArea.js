import React, { Component } from "react"

class TextArea extends Component {
    render() {
        return (
            <div>
                <label>Enter larger amount of things</label>
                <input
                    type= "textarea"
                    name= "textValue"
                    onChange= {this.props.handleChange}
                >
                    {this.props.children}
                </input>
            </div>
        )
    }

}