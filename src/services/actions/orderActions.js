import { checkResponse } from "../../utils/utils";
export const POST_ORDER_INFO_SUCCESS = "POST_ORDER_INFO_SUCCESS";
export const POST_ORDER_INFO_FAILED = "POST_ORDER_INFO_FAILED";

export function submitOrder(_orderUrl, idArray) {
    return function (dispatch) {
        fetch(_orderUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({
                ingredients: idArray,
            }),
        })
            .then(checkResponse)
            .then((data) => {
                dispatch({ type: POST_ORDER_INFO_SUCCESS, order: data.order });
            })
            .catch(() => {
                dispatch({ type: POST_ORDER_INFO_FAILED });
            });
    };
}