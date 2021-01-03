import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signin } from "../actions";
import { Form, Button } from "react-bootstrap";
import monday from "./../images/4.jpg";
import NavBar from "./../components/NavBar";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
    };
  }
  
  signIn = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.signin(data, () => {
      this.setState({ redirect: true });
      this.props.history.push("/")
    });
  };

  render() {
    return (
      <div>
        <NavBar navItems={[{ name: "登录", href: "/signin" }, "登录"]} />
        <div style={{ position: "relative" }}>
          <img
            src={monday}
            className="img-fluid"
            alt=""
            style={{ height: "100vh", width: "100vw" }}
          />
          <div
            style={{
              alignContent: "center",
              width: "100%",
              position: "absolute",
              top: "80px",
              opacity: "0.8",
            }}
          >
            <div
              className="container"
              style={{ width: "38%", marginLeft: "31%", marginRight: "31%" }}
            >
              <div className="jumbotron">
                <div style={{ textAlign: "center" }}>
                  <h2>登录页面</h2>
                </div>

                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>用户名</Form.Label>
                    <Form.Control
                      type="username"
                      placeholder="输入用户名"
                      onChange={(e) => {
                        this.setState({ username: e.target.value });
                      }}
                      autocomplete="off"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>密码</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="输入密码"
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                      autocomplete="off"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.signIn();
                    }}
                  >
                    登录
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    auth: state.auth.authenticated,
  };
}
export default compose(connect(mapStateToProps, { signin }))(Login);
