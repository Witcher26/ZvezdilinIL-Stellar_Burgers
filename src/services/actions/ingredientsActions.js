import { checkResponse } from "../../utils/utils";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SET_ACTIVE_INGREDIENT = "SET_ACTIVE_INGREDIENT";
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
            .then(checkResponse)
            .then((res) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredientsData: res.data,
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            });
    };
}