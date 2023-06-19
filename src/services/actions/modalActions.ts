import {
    CLOSE_MODAL,
    OPEN_INGREDIENTS_MODAL,
    OPEN_ORDER_MODAL,
    OPEN_CARD_MODAL,
    OPEN_CARD_ORDER_MODAL
} from "../constants";

type TOpenIngredientsModal = {
    readonly type: typeof OPEN_INGREDIENTS_MODAL;
};

type TOpenOrderModal = {
    readonly type: typeof OPEN_ORDER_MODAL;
};

type TOpenCardModal = {
    readonly type: typeof OPEN_CARD_MODAL;
};

type TOpenCardOrderModal = {
    readonly type: typeof OPEN_CARD_ORDER_MODAL;
};

type TCloseModal = {
    readonly type: typeof CLOSE_MODAL;
};

export type TActionsModal =
    | TOpenIngredientsModal
    | TOpenOrderModal
    | TOpenCardModal
    | TCloseModal
    | TOpenCardOrderModal;