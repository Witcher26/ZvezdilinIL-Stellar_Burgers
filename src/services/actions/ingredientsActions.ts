import { getIngredientsRequest } from "../api";
import {
    AppThunk,
    TConstructorIngredient,
        TIngredient
} from "../../utils/types/types";
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_ACTIVE_INGREDIENT,
    SET_CURRENT_TAB,
    ADD_BUN,
    INCREASE_INGREDIENT,
    DRAG_CONSTRUCTOR_INGREDIENTS,
    DRAG_BUN_INGREDIENT,
    SORT_INGREDIENTS_ON_DRAG,
    CLEAR_CONSTRUCTOR
} from "../constants";

type TAddIngredient = {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TConstructorIngredient[];
};

type TRemoveIngredient = {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly payload: TConstructorIngredient[];
};

type TGetIngredients = {
    readonly type: typeof GET_INGREDIENTS;
};

type TGetIngredientsSuccess = {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredientsData: TIngredient[] | [];
};

type TGetIngredientsFailed = {
    readonly type: typeof GET_INGREDIENTS_FAILED;
};

type TSetActiveIngredient = {
    readonly type: typeof SET_ACTIVE_INGREDIENT;
    readonly currentIngredient: TIngredient | null;
};

type TSetCurrentTab = {
    readonly type: typeof SET_CURRENT_TAB;
    readonly payload: string;
};

type TAddBun = {
    readonly type: typeof ADD_BUN;
    readonly payload: TIngredient;
};

type TIncreaseIngredient = {
    readonly type: typeof INCREASE_INGREDIENT;
    readonly id: string;
};

type TDragIngredients = {
    readonly type: typeof DRAG_CONSTRUCTOR_INGREDIENTS;
    readonly item: TConstructorIngredient;
};

type TDragBun = {
    readonly type: typeof DRAG_BUN_INGREDIENT;
    readonly payload: TIngredient;
};

type TSortIngredientsOnDrag = {
    readonly type: typeof SORT_INGREDIENTS_ON_DRAG;
    readonly payload: TConstructorIngredient[];
};

type TClearConstructor = {
    readonly type: typeof CLEAR_CONSTRUCTOR;
};

export type TIngredientsActions =
    | TAddIngredient
    | TRemoveIngredient
    | TGetIngredients
    | TGetIngredientsSuccess
    | TGetIngredientsFailed
    | TSetActiveIngredient
    | TSetCurrentTab
    | TAddBun
    | TIncreaseIngredient
    | TDragIngredients
    | TDragBun
    | TSortIngredientsOnDrag
    | TClearConstructor;

export function getIngredients(url: string): AppThunk {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        });
        getIngredientsRequest(url)
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredientsData: res.data
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            });
    };
};