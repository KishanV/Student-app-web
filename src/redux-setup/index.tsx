import {combineReducers, createStore} from "redux";

let loggedIn = false;
let studentData: any = {
    data: undefined
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
        if (action && action.type === 'logout') {
            loggedIn = false;
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