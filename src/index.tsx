import './index.scss';
import {render} from 'react-dom'
import React = require("react");
import {App} from "./app";
import {appStore} from "./redux";
import {Provider} from "react-redux";

window.oncontextmenu = (e: MouseEvent) => {
    return e.target instanceof HTMLInputElement && e.target.type == 'text';
};

const appElm = document.createElement('div');
appElm.classList.add('Container');
document.body.appendChild(appElm);

window.onload = () => {
    render(
        <Provider store={appStore}>
            <App/>
        </Provider>,
        appElm
    );
};
