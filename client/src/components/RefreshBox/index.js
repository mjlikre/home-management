import React, {Component} from "react";
import { compose } from "redux";
import { connect } from "react-redux"; 
import { Modal, Button } from "react-bootstrap"
import { signout } from "../../actions/index"
class RefreshBox extends Component {
    constructor(props){
        super(props);
        this.state ={
            show: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    };
    componentDidMount() {
        this.setState({show: this.props.show})
    }
    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
          this.setState({show: this.props.show})
        }
      }
    handleShow() {
        this.setState({show: true})
    }
    handleClose() {
        this.setState({show: false})
    }
    handleLogout (done) {
        this.props.signout()
        done()
    }
    
    render() {
        return (
            <>
      
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
            >
            <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>登录超时，请退出页面后重新登录</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Button variant="primary" onClick ={ ()=> {this.handleLogout(this.handleClose)}}>
                退出页面
            </Button>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>关闭</Button>
            </Modal.Footer>
            </Modal.Dialog>
            </Modal>
            </>
        )
    }


}

export default compose(
    connect(null, {signout})
)(RefreshBox);