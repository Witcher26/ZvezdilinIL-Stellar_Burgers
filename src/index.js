import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";

import { configureStore} from "./services/store";
import { Provider } from "react-redux";

const store = configureStore();

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);