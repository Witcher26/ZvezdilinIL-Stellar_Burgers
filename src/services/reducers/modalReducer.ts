import {
    CLOSE_MODAL,
    OPEN_ORDER_MODAL,
    OPEN_INGREDIENTS_MODAL,
    OPEN_CARD_MODAL,
    OPEN_CARD_ORDER_MODAL
} from "../constants";

import { TAppActions } from "../actions";
import { TOrder } from "../../utils/types/types";

type TModalState = {
    ingredientsModal: boolean;
    orderModal: boolean;
    cardModal: boolean;
    cardOrderModal: boolean;
    orderInfo: null | TOrder;
  };

  export const initialState: TModalState = {
    ingredientsModal: false,
    orderModal: false,
    cardModal: false,
    cardOrderModal: false,
    orderInfo: null,
  };

export const modalReducer = (state = initialState, action: TAppActions): TModalState => {
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
        case OPEN_CARD_MODAL:
            return {
                ...state,
                cardModal: true,
            };
            case OPEN_CARD_ORDER_MODAL:
            return {
                ...state,
                cardOrderModal: true,
            };
        default:
            return state;
    }
};