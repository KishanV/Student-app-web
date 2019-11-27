import React = require("react");
import './index.scss';
import {hot} from 'react-hot-loader/root';
import {connect} from "react-redux";
import Login from "../login";
import Dashboard from "../dashboard";
import Chart from "../chart";

interface State {

}

interface Props {
    studentData: any
    isLoggedIn: boolean
}

class App extends React.Component<Props, State> {
    state: State = {};

    constructor(props: any) {
        super(props);
    }

    getScreen() {
        if (this.props.studentData) {
            return <Chart/>
        }
        if (this.props.isLoggedIn) {
            return <Dashboard/>
        }
        return <Login/>;
    }

    render() {
        return <div className={'App'}>
            {this.getScreen()}
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        studentData: state.studentData.data,
        isLoggedIn: state.isLoggedIn,
        dispatch: state.dispatch
    };
};

export default hot(connect(mapStateToProps)(App));