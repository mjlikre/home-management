import React, {Component} from 'react';
import { Navbar, Nav} from "react-bootstrap";

class NavBar extends Component {

    render() {
        if (this.props.navItems && this.props.navType === "login"){ 
            return(
                <Navbar className = "navBar-color" expand="lg" variant= "light">
                <Navbar.Brand href="#home">蒋氏管理页面</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    {this.props.navItems ? (this.props.navItems.map((item, index) => {return (<Nav.Link href={item.href}>{item.name}</Nav.Link>)})) : (null)}
                    </Nav>
                    
                </Navbar.Collapse>
                </Navbar>
            )

        }
        else if (this.props.navType === "grocery") {
            return(
                
                <Navbar className = "navBar-color" expand="lg" variant= "light">
                <Navbar.Brand href="#home">蒋氏管理页面</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/main">主页面</Nav.Link>
                    <Nav.Link href="/sales">出售记录</Nav.Link>
                    <Nav.Link href="/specifics">详细账目</Nav.Link>
                    <Nav.Link href="/client">客户细节</Nav.Link>
                    <Nav.Link href="/signout">退出</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
                </Navbar>
            )  
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" style = {{ backgroundColor: "#e3f2fd", opacity: "0.8"}}>
                    <div className="container">
                    <a className="navbar-brand js-scroll-trigger" href="#page-top">Michael's Task Manager</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" style = {{color: "black"}} href="/">Main</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" style = {{color: "black"}} href="/temp">Temp</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" style = {{color: "black"}} href="/signout">SignOut</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>
    
            </div>
        );

    }
        
    
};

export default NavBar;
