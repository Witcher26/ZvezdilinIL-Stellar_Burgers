import {
    CLOSE_MODAL,
    OPEN_ORDER_MODAL,
    OPEN_INGREDIENTS_MODAL,
} from "../actions/modalActions";

const initialState = {
    ingredientsModal: false,
    orderModal: false,
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INGREDIENTS_MODAL:
            return {
                ...state,
                ingredientsModal: true,
            };
        case OPEN_ORDER_MODAL:
            return {
                ...state,
                orderModal: true,
            };
        case CLOSE_MODAL:
            return {
                ...state,
                orderModal: false,
                ingredientsModal: false,
            };
        default:
            return state;
    }
};