import React, {Component} from 'react';


class NavBar extends Component {

    render() {
        if (this.props.navItems){ 
            return(
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" style = {{ backgroundColor: "#e3f2fd", opacity: "0.8"}}>
                        <div className="container">
                            <a className="navbar-brand js-scroll-trigger" href="#page-top" >KJ House Accounting App</a>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item" >
                                <a className="nav-link js-scroll-trigger" href={this.props.navItems[0].href} style = {{color: "black"}}>{this.props.navItems[0].name}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href={this.props.navItems[1].href} style = {{color: "black"}}>{this.props.navItems[1].name}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href={this.props.navItems[2].href} style = {{color: "black"}}>{this.props.navItems[2].name}</a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </nav>
    
                </div>
            )

        }
        else if (this.props.navType === "grocery") {
            return(
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="groceryNav" style = {{ backgroundColor: "#e3f2fd", opacity: "0.8"}}>
                        <div className="container">
                        <a className="navbar-brand js-scroll-trigger" href="#page-top">KJ House Accounting App</a>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" style = {{color: "black"}} href="/dashboard">Main</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" style = {{color: "black"}} href="/go">Overview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" style = {{color: "black"}} href="/account">Account</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" style = {{color: "black"}} href="/signout">SignOut</a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </nav>
        
                </div>
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
                            <a className="nav-link js-scroll-trigger" style = {{color: "black"}} href="/main">Main</a>
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
