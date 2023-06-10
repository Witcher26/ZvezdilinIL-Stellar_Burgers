import { combineReducers } from "redux";
import { formReducer } from "./formReducer";
import { orderReducer } from "./orderReducer";
import { ingredientsReducer } from "./ingredientsReducer";
import { modalReducer } from "./modalReducer";
import { feedReducer } from "./feedReducer";
import { feedOrderReducer } from "./feedOrderReducer";

export const rootReducer = combineReducers({
    formReducer,
    orderReducer,
    ingredientsReducer,
    modalReducer,
    feedReducer,
    feedOrderReducer
});