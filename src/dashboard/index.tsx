import React = require("react");
import './index.scss';
import {connect} from "react-redux";

interface Props {
    dispatch: any
}

interface State {
    data?: any
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
            this.setState({
                data: json
            })
        }
    }

    list() {
        const data: any[] = this.state.data;
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
                    <div className={'Card'}>
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
                <div className={'Dropdown'} onClick={event1 => {
                    if (this.state.sort === 'A - Z') {
                        this.setState({
                            sort: 'Z - A'
                        })
                    } else {
                        this.setState({
                            sort: 'A - Z'
                        })
                    }
                }}>
                    {this.state.sort}
                    <div className={'Icon'}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect y="4.24268" width="1" height="6" transform="rotate(-45 0 4.24268)"
                                  fill="#333333"/>
                            <rect x="7.77817" y="3.53552" width="1" height="6"
                                  transform="rotate(45 7.77817 3.53552)"
                                  fill="#333333"/>
                        </svg>
                    </div>
                </div>
                <input placeholder="Search Item" className="Input" value={this.state.search} onChange={event => {
                    const str = event.target.value.trim().toLowerCase();
                    setTimeout(() => {
                        this.setState({
                            search: str
                        })
                    }, 100);
                }}/>
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
        dispatch: state.dispatch
    };
};

export default connect(mapStateToProps)(Dashboard);