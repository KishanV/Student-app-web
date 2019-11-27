import React = require("react");
import './index.scss';
import {connect} from "react-redux";

interface Props {
    studentData: any
    dispatch: any
}

class Chart extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    list() {
        return <div className={'List'}>
            <div className={'No-Data'}>Loading....</div>
        </div>;
    }

    titleBar() {
        return <div className={'SearchBar'}>
            <div className={'Holder'}>
                <div placeholder="Search Item" className="Input"/>
                <div className={'Sort-Button Selected'} onClick={event1 => {
                    this.props.dispatch({
                        type: 'removeStudentData'
                    })
                }}>
                    Back
                </div>
            </div>
        </div>
    }

    render() {
        return <div className={'Chart'}>
            <div className={'Title'}>
                {this.titleBar()}
            </div>
            <div className={'Holder'}>
                {this.list()}
            </div>
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        studentData: state.studentData.data,
        dispatch: state.dispatch
    };
};

export default connect(mapStateToProps)(Chart);