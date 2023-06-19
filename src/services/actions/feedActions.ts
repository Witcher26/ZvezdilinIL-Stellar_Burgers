import {
    FEED_CONNECT,
    FEED_DISCONNECT,
    FEED_CONNECTING,
    FEED_OPEN,
    FEED_CLOSE,
    FEED_MESSAGE,
    FEED_ERROR,
    FEED_CURRENT_ORDER,
} from "../constants";

import { TFeed, TFeedOrder } from "../../utils/types/types";

type TConnectAction = {
    readonly type: typeof FEED_CONNECT;
    payload: string;
};

type TDisconnectAction = {
    readonly type: typeof FEED_DISCONNECT;
    payload: string;
};

type TWsConnectingAction = {
    readonly type: typeof FEED_CONNECTING;
};

type TWsOpen = {
    readonly type: typeof FEED_OPEN;
};

type TWsClose = {
    readonly type: typeof FEED_CLOSE;
};

type TWsMessage = {
    readonly type: typeof FEED_MESSAGE;
    payload: TFeed;
};

type TWsError = {
    readonly type: typeof FEED_ERROR;
    payload: string;
};

type TWsOrder = {
    readonly type: typeof FEED_CURRENT_ORDER;
    payload: TFeedOrder;
};
    
export type TWsActions =
    | TConnectAction
    | TDisconnectAction
    | TWsConnectingAction
    | TWsOpen
    | TWsClose
    | TWsMessage
    | TWsError
    | TWsOrder;