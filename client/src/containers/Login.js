import React from "react";
import LoginBox from "../components/LogInBox/LoginBox"
import PageHeader from "./../components/PageHeader"


const Login = (props) => {
  return (
    <PageHeader type = "login" items = {[{ name: "登录", href: "/signin" }, "登录"]} >
      <LoginBox redirect = {()=>{props.history.push("/")}}/>
    </PageHeader>
  )
}

export default Login;