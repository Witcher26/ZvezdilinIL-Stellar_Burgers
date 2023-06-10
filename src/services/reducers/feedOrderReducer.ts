import { TFeedOrder } from "../../utils/types/types";
import { TAppActions } from "../actions";
import {
    FEED_ORDER_CONNECT,
    FEED_ORDER_CONNECTING,
    FEED_ORDER_OPEN,
    FEED_ORDER_CLOSE,
    FEED_ORDER_MESSAGE,
    FEED_ORDER_ERROR,
    FEED_ORDER_CURRENT_ORDER
} from "../constants";

type TWsState = {
    ordersList: [] | TFeedOrder[];
    connectingError: string;
    currentOrder: null | TFeedOrder;
};

export const feedState: TWsState = {
    ordersList: [],
    connectingError: "",
    currentOrder: null
};

export const feedOrderReducer = (state = feedState, action: TAppActions): TWsState => {
    switch (action.type) {
        case FEED_ORDER_CONNECTING:
            return {
                ...state
            };
        case FEED_ORDER_CONNECT:
            return {
                ...state
            };
        case FEED_ORDER_OPEN:
            return {
                ...state,
                connectingError: ""
            };
        case FEED_ORDER_CLOSE:
            return {
                ...state
            };
        case FEED_ORDER_ERROR:
            return {
                ...state,
                connectingError: action.payload
            };
        case FEED_ORDER_MESSAGE:
            return {
                ...state,
                ordersList: action.payload.orders
            };
        case FEED_ORDER_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: action.payload
            };
        default:
            return state;
    }
};