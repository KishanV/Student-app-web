import React = require("react");
import './index.scss';
import {connect} from "react-redux";

interface Props {
    dispatch: any
}

interface State {

}

class Login extends React.Component<Props, State> {
    state: State = {};

    constructor(props: any) {
        super(props);
    }

    render() {
        return <div className={'Login'}>
            <div className={'Title'}>Login</div>
            <div className={'User-Label'}>User Name</div>
            <input className={'User-id'}/>
            <div className={'Password-Label'}>Password</div>
            <input type={'password'} className={'Password'}/>
            <div className={'Enter'} onClick={event1 => {
                this.props.dispatch({
                    type: 'loggedInSuccess'
                })
            }}>Enter
            </div>
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        dispatch: state.dispatch
    };
};

export default connect(mapStateToProps)(Login);