import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signin } from "../actions";
import { Form, Button } from "react-bootstrap";
import PageHeader from "./../components/PageHeader"



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      hideNav: false
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
}

resize() {
  let currentHideNav = (window.innerWidth <= 768);
  if (currentHideNav !== this.state.hideNav) {
      this.setState({hideNav: currentHideNav});
  }
}

componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
}
  signIn = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.signin(data, () => {
      this.setState({ redirect: true });
      this.props.history.push("/");
    });
  };
  

  render() {
    return (

        <PageHeader type = "login" items = {[{ name: "登录", href: "/signin" }, "登录"]} >

          <div
            style={{
              alignContent: "center",
              width: "100%",
              position: "absolute",
              top: "150px",
              opacity: "0.8",
            }}
          >
              <div className="login-container" style = {!this.state.hideNav ? ({maxWidth: "500px"}) : ({maxWidth: "350px"})}>
                <div style={{ textAlign: "center" }}>
                  <h2>登录页面</h2>
                  <div className = "errorMessage"> {this.props.errorMessage ? "用户名或密码错误" : null}</div>
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
        </PageHeader>
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
