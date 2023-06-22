import { TIngredient, TConstructorIngredient } from "../../utils/types/types";
import { TIngredientsActions } from "../actions/ingredientsActions";
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
import { initialState, ingredientsReducer } from "./ingredientsReducer";

const mockIngredients: TIngredient[] = [
  {
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    _id: "643d69a5c3f7b9001cfa093c",
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    qty: 0,
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    name: "Биокотлета из марсианской Магнолии",
    price: 424,
    proteins: 420,
    type: "main",
    _id: "643d69a5c3f7b9001cfa0941",
    qty: 0,
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    name: "Биокотлета из марсианской Магнолии",
    price: 424,
    proteins: 420,
    type: "main",
    _id: "643d69a5c3f7b9001cfa0941",
    qty: 0,
  },
];

const chosenIngredient: TIngredient = {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    name: "Биокотлета из марсианской Магнолии",
    price: 424,
    proteins: 420,
    type: "main",
    _id: "643d69a5c3f7b9001cfa0941",
    qty: 0,
};

const chosenBun: TIngredient = {
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    _id: "643d69a5c3f7b9001cfa093c",
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    qty: 0,
};

const index = 1;

const activeTab = "sauce";
const dragIdx = 1;
const hoverIdx = 2;
const dragIngredient = initialState.constructorIngredients[dragIdx];
const newArr = [...initialState.constructorIngredients];
newArr.splice(dragIdx, 1);
newArr.splice(hoverIdx, 0, dragIngredient);

describe("ingredients reducer", () => {
    it("should return initial state", () => {
        expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual(
            initialState
        );
    });

    it("should set ingredients loading", () => {
        expect(
            ingredientsReducer(initialState, {
                type: GET_INGREDIENTS,
            })
        ).toEqual({
            ...initialState,
            loading: true,
        });
    });

    it("should return array of ingredients", () => {
        expect(
            ingredientsReducer(initialState, {
                type: GET_INGREDIENTS_SUCCESS,
                ingredientsData: mockIngredients
            })
        ).toEqual({
            ...initialState,
            ingredientsData: mockIngredients,
            loading: false,
            error: false,
        });
    });

    it("should throw error", () => {
        expect(
            ingredientsReducer(initialState, {
                type: GET_INGREDIENTS_FAILED,
            })
        ).toEqual({
            ...initialState,
            error: true,
            loading: false,
        });
    });

    it("should add ingredient", () => {
        expect(
            ingredientsReducer(initialState, {
                type: ADD_INGREDIENT,
                payload: [
                    ...initialState.constructorIngredients,
                    { ...chosenIngredient, key: "abc" },
                ],
            })
        ).toEqual({
            ...initialState,
            constructorIngredients: [
                ...initialState.constructorIngredients,
                { ...chosenIngredient, key: "abc" },
            ],
        });
    });

    it("should remove ingredient", () => {
        expect(
            ingredientsReducer(initialState, {
                type: REMOVE_INGREDIENT,
                payload: [
                    ...initialState.constructorIngredients.slice(0, index),
                    ...initialState.constructorIngredients.slice(index + 1),
                ],
            })
        ).toEqual({
            ...initialState,
            constructorIngredients: [
                ...initialState.constructorIngredients.slice(0, index),
                ...initialState.constructorIngredients.slice(index + 1),
            ],
        });
    });

    it("should set active ingredient", () => {
        expect(
            ingredientsReducer(initialState, {
                type: SET_ACTIVE_INGREDIENT,
                currentIngredient: chosenIngredient || null,
            })
        ).toEqual({
            ...initialState,
            currentIngredient: chosenIngredient || null,
        });
    });

    it("should set active tab", () => {
        expect(
            ingredientsReducer(initialState, {
                type: SET_CURRENT_TAB,
                payload: activeTab,
            })
        ).toEqual({
            ...initialState,
            currentTab: activeTab,
        });
    });

    it("should add bun", () => {
        expect(
            ingredientsReducer(initialState, {
                type: ADD_BUN,
                payload: chosenBun,
            })
        ).toEqual({
            ...initialState,
            bun: chosenBun,
        });
    });

    it("should increase ingredient", () => {
        expect(
            ingredientsReducer(initialState, {
                type: INCREASE_INGREDIENT,
                id: "123",
            })
        ).toEqual({
            ...initialState,
            constructorIngredients: [...initialState.constructorIngredients].map(
                (item: TConstructorIngredient) =>
                    item._id === chosenIngredient._id
                    ? { ...item, qty: ++item.qty }
                    : item
            ),
        });
    });

    it("should drag constructor ingredient", () => {
        expect(
            ingredientsReducer(initialState, {
                type: DRAG_CONSTRUCTOR_INGREDIENTS,
                item: { ...chosenIngredient, key: "123" },
            })
        ).toEqual({
            ...initialState,
            constructorIngredients: [
                ...initialState.constructorIngredients,
                { ...chosenIngredient, key: "123" },
            ],
        });
    });

    it("should drag bun", () => {
        expect(
            ingredientsReducer(initialState, {
                type: DRAG_BUN_INGREDIENT,
                payload: { ...chosenBun, qty: chosenBun.qty },
            })
        ).toEqual({
            ...initialState,
            bun: { ...chosenBun, qty: chosenBun.qty },
        });
    });

    it("should sort ingredients on drag", () => {
        expect(
            ingredientsReducer(initialState, {
                type: SORT_INGREDIENTS_ON_DRAG,
                payload: newArr,
            })
        ).toEqual({
            ...initialState,
            constructorIngredients: newArr,
        });
    });

    it("should clear constructor", () => {
        expect(
            ingredientsReducer(initialState, {
                type: CLEAR_CONSTRUCTOR,
            })
        ).toEqual({
            ...initialState,
            constructorIngredients: [],
            bun: null,
        });
    });
});