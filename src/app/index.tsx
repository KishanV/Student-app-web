import React = require("react");
import './index.scss';
import {hot} from 'react-hot-loader/root';
import {connect} from "react-redux";
import Login from "../login";

interface State {

}

interface Props {
    isLoggedIn: boolean
}

class App extends React.Component<Props, State> {
    state: State = {};

    constructor(props: any) {
        super(props);
    }

    async loadData() {

    }

    render() {
        return <div className={'App'}>
            {this.props.isLoggedIn === false && <Login/>}
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    console.log('state', state);
    return {
        isLoggedIn: state.isLoggedIn,
        dispatch: state.dispatch
    };
};

export default hot(connect(mapStateToProps)(App));