import { TConstructorIngredient, TIngredient } from "../../utils/types/types";
import { TAppActions } from "../actions";
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
} from "../constants";

type TIngredientsState = {
    ingredientsData: TIngredient[] | [];
    loading: boolean;
    error: boolean;
    constructorIngredients: TConstructorIngredient[];
    currentIngredient: TIngredient | null;
    currentTab: string;
    bun: TIngredient | null;
  };
  

export const initialState: TIngredientsState = {
    ingredientsData: [],
    loading: true,
    error: false,
    constructorIngredients: [],
    currentIngredient: null,
    currentTab: "bun",
    bun: null,
};

export const ingredientsReducer = (state = initialState, action: TAppActions): TIngredientsState => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                constructorIngredients: action.payload,
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                constructorIngredients: action.payload,
            };
        case GET_INGREDIENTS:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsData: action.ingredientsData,
                loading: false,
            };
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case SET_ACTIVE_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.currentIngredient,
            };

        case SET_CURRENT_TAB:
            return {
                ...state,
                currentTab: action.payload,
            };
        case ADD_BUN:
            return {
                ...state,
                bun: action.payload,
            };
        case INCREASE_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients].map(item =>
                    item._id === action.id
                        ? { ...item, qty: ++item.qty }
                        : item
                ),
            };
        }
        case DRAG_BUN_INGREDIENT: {
            return {
                ...state,
                bun: action.payload,
            };
        }
        case DRAG_CONSTRUCTOR_INGREDIENTS: {
            return {
                ...state,
                constructorIngredients: [
                    ...state.constructorIngredients,
                    action.item,
                ],
            };
        }
        case SORT_INGREDIENTS_ON_DRAG: {
            return {
                ...state,
                constructorIngredients: action.payload,
            };
        }
        default:
            return state;
    }
};