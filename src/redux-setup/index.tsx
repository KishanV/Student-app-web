import {combineReducers, createStore} from "redux";

let loggedIn = false;

const reducer = combineReducers({
    isLoggedIn: (state = loggedIn, action: any) => {
        if (action && action.type === 'loggedInSuccess') {
            loggedIn = true;
            return loggedIn;
        }
        return state;
    }
});

export const appStore = createStore(reducer);