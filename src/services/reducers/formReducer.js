import {
    RESET_FORM_FAILED,
    RESET_FORM_SUCCESS,
    UPDATE_FORM_FAILED,
    UPDATE_FORM_SUCCESS,
    REGISTER_FORM_SUCCESS,
    REGISTER_FORM_FAILED,
    LOGIN_FORM_SUCCESS,
    LOGIN_FORM_FAILED,
    SET_USER_FAILED,
    SET_USER_SUCCESS,
    AUTH_CHECK,
    LOGOUT_FORM_SUCCESS,
    LOGOUT_FORM_FAILED,
} from "../actions/formActions";

const initialState = {
    resetFormFailed: false,
    resetFormSuccess: false,
    updateFormFailed: false,
    updateFormSuccess: false,
    registerFormSuccess: false,
    registerFormFailed: false,
    loginFormSuccess: false,
    loginFormFailed: false,
    userInfo: null,
    userInfoFailed: false,
    userInfoSuccess: false,
    isAuthChecked: false,
    logoutFormSuccess: false,
    logoutFormFailed: false,
};

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_FORM_SUCCESS: {
            return {
                ...state,
                resetFormSuccess: true,
                resetFormFailed: false,
            };
        }
        case RESET_FORM_FAILED:
            return {
                ...state,
                resetFormFailed: true,
                resetFormSuccess: false,
            };
        case UPDATE_FORM_SUCCESS: {
            return {
                ...state,
                updateFormSuccess: true,
                updateFormFailed: false,
            };
        }
        case UPDATE_FORM_FAILED:
            return {
                ...state,
                updateFormFailed: true,
                updateFormSuccess: false,
            };
        case REGISTER_FORM_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                registerFormSuccess: true,
                registerFormFailed: false,
            };
        case REGISTER_FORM_FAILED:
            return {
                ...state,
                registerFormFailed: true,
                registerFormSuccess: false,
            };
        case LOGIN_FORM_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                loginFormSuccess: true,
                loginFormFailed: false,
            };
        case LOGIN_FORM_FAILED:
            return {
                ...state,
                loginFormFailed: true,
                loginFormSuccess: false,
            };
        case SET_USER_FAILED: {
            return {
                ...state,
                userInfoFailed: true,
                userInfoSucces: false,
            };
        }
        case SET_USER_SUCCESS: {
            return {
                ...state,
                userInfoSucces: true,
                userInfoFailed: false,
                userInfo: action.payload,
            };
        }
        case AUTH_CHECK: {
            return {
                ...state,
                isAuthChecked: action.payload,
            };
        }
        case LOGOUT_FORM_SUCCESS: {
            return {
                ...state,
                logoutFormSuccess: true,
                logoutFormFailed: false,
                userInfo: null,
            };
        }
        case LOGOUT_FORM_FAILED: {
            return {
                ...state,
                logoutFormFailed: true,
                logoutFormSuccess: false,
            };
        }
        default:
            return state;
    }
};