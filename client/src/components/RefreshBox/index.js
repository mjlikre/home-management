import React, {Component} from "react";
import { compose } from "redux";
import { connect } from "react-redux"; 
import { Modal, Button } from "react-bootstrap"
import { refreshToken, signout } from "../../actions/index"
class RefreshBox extends Component {
    constructor(props){
        super(props);
        this.state ={
            show: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        // this.handleRefresh = this.handleRefresh.bind(this);
        // this.handleLogout = this.handleLogout.bind(this);
    };
    componentDidMount() {
        console.log("what")
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
    

    handleRefresh = async (done)=>{
        await this.props.refreshToken()
        done()
    }
    handleLogout (done) {
        this.props.signout(this.props.history.push('/signin'))
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
                <Modal.Title>登录超时，请更新密匙或退出页面</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Button variant="primary" onClick ={ ()=> {this.handleRefresh(this.handleClose)}}>
                更新密匙
            </Button>
            <br/>
            <br/>
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
    connect(null, {refreshToken, signout})
)(RefreshBox);