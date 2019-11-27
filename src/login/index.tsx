import React = require("react");
import './index.scss';
import {connect} from "react-redux";

interface Props {
    dispatch: any
}

interface State {
    user: string
    password: string
}

class Login extends React.Component<Props, State> {
    state: State = {
        user: '',
        password: ''
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        return <div className={'Login'}>
            <div className={'Title'}>Login</div>
            <div className={'User-Label'}>User Name</div>
            <input className={'User-id'} placeholder={'please enter username'} value={this.state.user}
                   onChange={event => {
                       this.setState({
                           user: event.target.value.trim()
                       })
                   }}/>
            <div className={'Password-Label'}>Password</div>
            <input type={'password'} placeholder={'please enter password'} value={this.state.password}
                   onChange={event => {
                       this.setState({
                           password: event.target.value.trim()
                       })
                   }} className={'Password'}/>
            <div className={'Enter'} onClick={event1 => {
                if (this.state.password === '' && this.state.user === '') {
                    alert('Please enter username and password.');
                    return;
                }
                if (this.state.password === '') {
                    alert('Please enter password.');
                    return;
                }
                if (this.state.user === '') {
                    alert('Please enter username.');
                    return
                }
                this.props.dispatch({
                    type: 'loggedInSuccess'
                })
            }}>Enter
            </div>
            <div className={'Bottom'}>click on enter to login.</div>
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        dispatch: state.dispatch
    };
};

export default connect(mapStateToProps)(Login);