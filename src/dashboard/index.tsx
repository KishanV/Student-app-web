import React = require("react");
import './index.scss';
import {connect} from "react-redux";

interface Props {
    dispatch: any,
    allData?: any
}

interface State {
    search: string
    sort: string
}

class Dashboard extends React.Component<Props, State> {
    state: State = {
        search: '',
        sort: 'A - Z'
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.loadData();
        }, 1000)
    }

    async loadData() {
        let response = await fetch(`https://api.myjson.com/bins/1dlper`);
        if (response.ok) {
            let json: any = await response.json();
            this.props.dispatch({
                type: 'setAllData',
                data: json
            })
        }
    }

    list() {
        const data: any[] = this.props.allData;
        if (data === undefined) {
            return <div className={'List'}>
                <div className={'No-Data'}>Loading....</div>
            </div>;
        }
        const list = [];
        const sortedList = Object.values(data) as any[];
        sortedList.sort((a, b) => {
            if (this.state.sort === 'A - Z') {
                if (a.name < b.name) {
                    return -1;
                }
                if (b.name < a.name) {
                    return 1;
                }
            } else {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
            }

            return 0;
        });
        for (let index = 0; index < sortedList.length; index++) {
            const studentData = sortedList[index];
            let canRender = true;
            if (this.state.search !== '') {
                if (studentData.name.toLowerCase().startsWith(this.state.search)) {
                    canRender = true
                } else {
                    canRender = false;
                }
            }
            if (canRender) {
                list.push(
                    <div key={studentData.name + index} className={'Card'} onClick={event1 => {
                        console.log('studentData', studentData);
                        this.props.dispatch({
                            type: 'setStudentData',
                            data: studentData
                        })
                    }}>
                        <div className={'Line'}>
                            <span className={'Title'}>Name:</span> {studentData.name}
                        </div>
                        <div className={'Line'}>
                            <span className={'Title'}>Class:</span> {studentData.class}
                        </div>
                        <div className={'Line'}>
                            <span className={'Title'}>Roll No:</span> {studentData.rollNo}
                        </div>
                    </div>
                );
            }
        }
        return <div className={'List'}>
            {list}
        </div>
    }

    search() {
        return <div className={'SearchBar'}>
            <div className={'Holder'}>
                <input placeholder="Search Item" className="Input" value={this.state.search} onChange={event => {
                    const str = event.target.value.trim().toLowerCase();
                    setTimeout(() => {
                        this.setState({
                            search: str
                        })
                    }, 100);
                }}/>

                <div className={'Sort-Button' + (this.state.sort === 'A - Z' ? ' Selected' : '')} onClick={event1 => {
                    this.setState({
                        sort: 'A - Z'
                    })
                }}>
                    A - Z
                </div>
                <div className={'Sort-Button' + (this.state.sort === 'Z - A' ? ' Selected' : '')} onClick={event1 => {
                    this.setState({
                        sort: 'Z - A'
                    })
                }}>
                    Z - A
                </div>
            </div>
        </div>
    }

    render() {
        return <div className={'Dashboard'}>
            <div className={'Title'}>
                {this.search()}
            </div>
            <div className={'Holder'}>
                {this.list()}
            </div>
        </div>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        allData: state.allData.data,
        dispatch: state.dispatch
    };
};

export default connect(mapStateToProps)(Dashboard);