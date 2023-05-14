import { combineReducers } from "redux";
import { formReducer } from "./formReducer";
import { orderReducer } from "./orderReducer";
import { ingredientsReducer } from "./ingredientsReducer";
import { modalReducer } from "./modalReducer";

export const rootReducer = combineReducers({
    formReducer,
    orderReducer,
    ingredientsReducer,
    modalReducer
});