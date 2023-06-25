import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";

import { configureStore} from "./services/store";
import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from 'react-router-dom';

const store = configureStore();
const rootNode = document.querySelector("#root");

if  (!rootNode) {
    throw new Error("root-element не найден");
}

const root = ReactDOM.createRoot(rootNode);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>
);