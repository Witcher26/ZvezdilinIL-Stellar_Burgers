import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers/reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./socketMiddleware";

import {
    FEED_CONNECT,
    FEED_CLOSE,
    FEED_ERROR,
    FEED_MESSAGE,
    FEED_OPEN,
    FEED_ORDER_CONNECT,
    FEED_ORDER_CLOSE,
    FEED_ORDER_ERROR,
    FEED_ORDER_MESSAGE,
    FEED_ORDER_OPEN,
    FEED_DISCONNECT,
    FEED_ORDER_DISCONNECT
} from "./constants";
import {
    TFeedStoreActions,
    TFeedOrderStoreActions
} from "../utils/types/types";

const wsFeedActions: TFeedStoreActions = {
    onInit: FEED_CONNECT,
    onOpen: FEED_OPEN,
    onClose: FEED_CLOSE,
    onError: FEED_ERROR,
    onMessage: FEED_MESSAGE,
    onDisconnect: FEED_DISCONNECT
};

const wsFeedOrderActions: TFeedOrderStoreActions = {
    onInit: FEED_ORDER_CONNECT,
    onOpen: FEED_ORDER_OPEN,
    onClose: FEED_ORDER_CLOSE,
    onError: FEED_ORDER_ERROR,
    onMessage: FEED_ORDER_MESSAGE,
    onDisconnect: FEED_ORDER_DISCONNECT
};

export type RootState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(
        thunk,
        socketMiddleware(wsFeedActions),
        socketMiddleware(wsFeedOrderActions)))
    );

    return store;
};