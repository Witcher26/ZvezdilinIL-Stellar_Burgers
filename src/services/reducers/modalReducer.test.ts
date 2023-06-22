import { initialState, modalReducer } from "./modalReducer";
import { TActionsModal } from "../actions/modalActions";
import {
    CLOSE_MODAL,
    OPEN_ORDER_MODAL,
    OPEN_INGREDIENTS_MODAL,
    OPEN_CARD_MODAL,
    OPEN_CARD_ORDER_MODAL
} from "../constants";

describe("modal reducer", () => {
    it("should return initial state", () => {
        expect(modalReducer(undefined, {} as TActionsModal)).toEqual(initialState);
    });

    it("should close modal", () => {
        expect(
            modalReducer(initialState, {
                type: CLOSE_MODAL,
            })
        ).toEqual({
            ...initialState,
            orderModal: false,
            ingredientsModal: false,
            cardModal: false,
            cardOrderModal: false,
            orderInfo: null,
        });
    });

    it("should open order modal", () => {
        expect(
            modalReducer(initialState, {
                type: OPEN_ORDER_MODAL,
            })
        ).toEqual({
            ...initialState,
            orderModal: true,
        });
    });

    it("should open ingredients modal", () => {
        expect(
            modalReducer(initialState, {
                type: OPEN_INGREDIENTS_MODAL,
            })
        ).toEqual({
            ...initialState,
            ingredientsModal: true,
        });
    });

    it("should open card modal", () => {
        expect(
            modalReducer(initialState, {
                type: OPEN_CARD_MODAL,
            })
        ).toEqual({
            ...initialState,
            cardModal: true,
        });
    });

    it("should open card order modal", () => {
        expect(
            modalReducer(initialState, {
                type: OPEN_CARD_ORDER_MODAL,
            })
        ).toEqual({
            ...initialState,
            cardOrderModal: true,
        });
    });
});