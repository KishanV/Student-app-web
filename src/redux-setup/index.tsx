import {combineReducers, createStore} from "redux";

let loggedIn = true;
let studentData: any = {
    data: {
        name: "Sadhya",
        class: 3.,
        rollNo: 110.,
        marks: {
            s1: 55,
            s2: 67,
            s3: 77,
        }
    }
};

let allData = {
    data: undefined
};

const reducer = combineReducers({
    allData: (state = allData, action: any) => {
        if (action && action.type === 'setAllData') {
            allData = {
                data: action.data
            };
            return allData;
        }
        return state;
    },
    isLoggedIn: (state = loggedIn, action: any) => {
        if (action && action.type === 'loggedInSuccess') {
            loggedIn = true;
            return loggedIn;
        }
        return state;
    },
    studentData: (state = studentData, action: any) => {
        if (action && action.type === 'setStudentData') {
            studentData = {
                data: action.data
            };
            return studentData;
        } else if (action && action.type === 'removeStudentData') {
            studentData = {};
            return studentData;
        }
        return state;
    }
});

export const appStore = createStore(reducer);