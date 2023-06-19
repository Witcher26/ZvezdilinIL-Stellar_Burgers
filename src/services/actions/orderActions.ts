import { AppThunk, TOrderResponse } from "../../utils/types/types";
import { submitOrderRequest } from "../api";
import { CLEAR_CONSTRUCTOR } from "../constants";
import { POST_ORDER_INFO_FAILED, POST_ORDER_INFO_SUCCESS } from "../constants";

type TOrderInfoSuccess = {
    readonly type: typeof POST_ORDER_INFO_SUCCESS;
    readonly payload: TOrderResponse;
};

type TOrderInfoFailed = {
    readonly type: typeof POST_ORDER_INFO_FAILED;
};

export type TOrderActions = TOrderInfoSuccess | TOrderInfoFailed;

export function submitOrder(_orderUrl: string, idArray: string[]): AppThunk {
    return function (dispatch) {
        submitOrderRequest(_orderUrl, idArray)
            .then(data => {
                dispatch({
                    type: POST_ORDER_INFO_SUCCESS,
                    payload: data });
                dispatch({
                    type: CLEAR_CONSTRUCTOR
                });
            })
            .catch(() => {
                dispatch({
                    type: POST_ORDER_INFO_FAILED
                });
        });
    };
}