import {
    POST_ORDER_INFO_SUCCESS,
    POST_ORDER_INFO_FAILED,
} from "../actions/orderActions";

const initialState = {
    order: {},
    orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ORDER_INFO_SUCCESS:
            return {
                ...state,
                order: action.order,
            };
        case POST_ORDER_INFO_FAILED:
            return {
                ...state,
                orderFailed: true,
            };
        default:
            return state;
    }
};