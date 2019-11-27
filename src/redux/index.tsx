import {combineReducers, createStore} from "redux";

const reducer = combineReducers({
    demo: (state = 1, action: any) => {
        return state;
    }
});

export const appStore = createStore(reducer);