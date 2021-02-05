import React, {useState, useEffect} from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import { signin } from "../../actions";
import { Form, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
const LoginBox = (props) => {
    const [authInput, setAuthInput] = useState({
        username: "",
        password: ""
    })
    let mobile = useMediaQuery({ query: "(max-width: 768px)" });
    const signIn = () => {
        props.signin(authInput, () => {
            props.redirect()
          });
    }

    useEffect(()=> {
        if (props.auth && localStorage.getItem("token")) {
            props.redirect()
        }
    }, [])
    return (
            <div
            style={{
              alignContent: "center",
              width: "100%",
              position: "absolute",
              top: "150px",
              opacity: "0.8",
            }}
          >
              <div className="login-container" style = {!mobile ? ({maxWidth: "500px"}) : ({maxWidth: "350px"})}>
                <div style={{ textAlign: "center" }}>
                  <h2>登录页面</h2>
                  <div className = "errorMessage"> {props.errorMessage ? "用户名或密码错误" : null}</div>
                </div>

                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>用户名</Form.Label>
                    <Form.Control
                      type="username"
                      placeholder="输入用户名"
                      onChange={(e) => {
                        setAuthInput({...authInput, username: e.target.value})
                      }}
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>密码</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="输入密码"
                      onChange={(e) => {
                        setAuthInput({...authInput, password: e.target.value})
                      }}
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => {
                      signIn();
                    }}
                  >
                    登录
                  </Button>
                </Form>
                
              </div>
            </div>
            

    )
}

function mapStateToProps(state) {
    return {
      errorMessage: state.auth.errorMessage,
      auth: state.auth.authenticated,
    };
  }

  export default compose(connect(mapStateToProps, { signin }))(LoginBox);
