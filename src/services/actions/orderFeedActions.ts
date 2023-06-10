import {
    FEED_ORDER_OPEN,
    FEED_ORDER_CLOSE,
    FEED_ORDER_ERROR,
    FEED_ORDER_CURRENT_ORDER,
    FEED_ORDER_MESSAGE,
    FEED_ORDER_CONNECTING,
    FEED_ORDER_CONNECT,
    FEED_ORDER_DISCONNECT,
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    API_BASE
} from "../constants";
import { AppThunk, TFeedOrderResponse } from "../../utils/types/types";
import { getOrderRequest } from "../api";

import { TFeed, TFeedOrder } from "../../utils/types/types";

type TWsConnectOrderAction = {
    readonly type: typeof FEED_ORDER_CONNECT;
    payload: string;
};

type TWsDisconnectOrderAction = {
    readonly type: typeof FEED_ORDER_DISCONNECT;
    payload: string;
};

type TWsConnectingOrderAction = {
    readonly type: typeof FEED_ORDER_CONNECTING;
};

type TWsOrderOpen = {
    readonly type: typeof FEED_ORDER_OPEN;
};

type TWsOrderClose = {
    readonly type: typeof FEED_ORDER_CLOSE;
};

type TWsOrderMessage = {
    readonly type: typeof FEED_ORDER_MESSAGE;
    payload: TFeed;
};

type TWsOrderError = {
    readonly type: typeof FEED_ORDER_ERROR;
    payload: string;
};

type TWsCurrentOrder = {
    readonly type: typeof FEED_ORDER_CURRENT_ORDER;
    payload: TFeedOrder;
};

type TGetOrder = {
    readonly type: typeof GET_ORDER;
};

type TGetOrderSuccess = {
    readonly type: typeof GET_ORDER_SUCCESS;
    payload: TFeedOrder;
};

type TGetOrderFailed = {
    readonly type: typeof GET_ORDER_FAILED;
};

export function getOrder(id: string): AppThunk {
    return function (dispatch) {
        dispatch({ type: GET_ORDER });
        getOrderRequest(`${API_BASE}/orders`, id)
            .then((res: TFeedOrderResponse) => {
                dispatch({ type: GET_ORDER_SUCCESS, payload: res.orders[0] });
                })
                .catch(() => {
                    dispatch({ type: GET_ORDER_FAILED });
                });
    };
}

export type TWsOrderActions =
    | TWsConnectingOrderAction
    | TWsOrderOpen
    | TWsOrderClose
    | TWsOrderMessage
    | TWsOrderError
    | TWsConnectOrderAction
    | TWsDisconnectOrderAction
    | TWsCurrentOrder
    | TGetOrder
    | TGetOrderSuccess
    | TGetOrderFailed;  