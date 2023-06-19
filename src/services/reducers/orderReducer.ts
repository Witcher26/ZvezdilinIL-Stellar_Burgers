import {
    POST_ORDER_INFO_SUCCESS,
    POST_ORDER_INFO_FAILED,
} from "../constants";

import { TOrder, TOrderResponse } from "../../utils/types/types";
import { TAppActions } from "../actions";

type TOrderState = {
    order: TOrder | null;
    orderFailed: boolean;
    data: TOrderResponse[];
};

export const orderState: TOrderState = {
    order: null,
    orderFailed: false,
    data: [],
};

export const orderReducer = (state = orderState, action: TAppActions): TOrderState => {
    switch (action.type) {
        case POST_ORDER_INFO_SUCCESS:
            return {
                ...state,
                order: action.payload.order,
                data: [...state.data, { ...action.payload }]
            };
            case POST_ORDER_INFO_FAILED:
                return {
                    ...state,
                    orderFailed: true
                };
        default:
            return state;
    }
};