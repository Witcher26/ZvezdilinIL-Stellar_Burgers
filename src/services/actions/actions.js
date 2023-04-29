import { checkResponse } from "../../utils/utils";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const OPEN_INGREDIENTS_MODAL = "OPEN_INGREDIENTS_MODAL";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_ACTIVE_INGREDIENT = "SET_ACTIVE_INGREDIENT";
export const POST_ORDER_INFO_SUCCESS = "POST_ORDER_INFO_SUCCESS";
export const POST_ORDER_INFO_FAILED = "POST_ORDER_INFO_FAILED";
export const SET_CURRENT_TAB = "SET_CURRENT_TAB";
export const ADD_BUN = "ADD_BUN";
export const INCREASE_INGREDIENT = "INCREASE_INGREDIENT";
export const DRAG_CONSTRUCTOR_INGREDIENTS = "DRAG_CONSTRUCTOR_INGREDIENTS";
export const DRAG_BUN_INGREDIENT = "DRAG_BUN_INGREDIENT";
export const SORT_INGREDIENTS_ON_DRAG = "SORT_INGREDIENTS_ON_DRAG";

export function getIngredients(url) {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS,
        });
        fetch(url)
            .then(res => checkResponse(res))
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredientsData: res.data,
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
                console.log(err.message);
            });
    };
}

export function submitOrder(_orderUrl, idArray) {
    return function (dispatch) {
        fetch(_orderUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredients: idArray,
            }),
        })
            .then(res => checkResponse(res))
            .then(data => {
                dispatch({ type: POST_ORDER_INFO_SUCCESS, order: data.order });
            })
            .catch(err => {
                dispatch({ type: POST_ORDER_INFO_FAILED });
                console.log(err.message);
            });
    };
}