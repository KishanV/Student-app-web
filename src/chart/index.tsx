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

    chart() {
        const list = [];
        const marks = this.props.studentData.marks;
        let count = 0;
        let totel = 0;
        for (const subject in marks) {
            const data = marks[subject];
            totel += data;
            list.push(<div key={(++count).toString()} className={'Col'}>
                <div className={'Fill'} style={{height: data + 'px'}}>{data}</div>
                <div className={'Subject'}>{subject}</div>
            </div>);
        }
        return <div className={'Chart'}>
            {list}
            <div className={'Total'}>Total = {totel}</div>
        </div>;
    }

    titleBar() {
        return <div className={'Bar'}>
            <div className={'Holder'}>
                <div className="Student-Name">
                    Student: {this.props.studentData.name} ({this.props.studentData.rollNo})
                </div>
                <div className={'Back-Button'} onClick={event1 => {
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
                {this.chart()}
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