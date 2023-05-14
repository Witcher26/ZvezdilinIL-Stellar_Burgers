import { checkResponse } from "../utils";
import { fetchWithRefresh } from "../auth";
import { baseUrl } from "../../env";
export const RESET_FORM_FAILED = "RESET_FORM_FAILED";
export const RESET_FORM_SUCCESS = "RESET_FORM_SUCCESS";
export const UPDATE_FORM_FAILED = "UPDATE_FORM_FAILED";
export const UPDATE_FORM_SUCCESS = "UPDATE_FORM_SUCCESS";
export const REGISTER_FORM_SUCCESS = "REGISTER_FORM_SUCCESS";
export const REGISTER_FORM_FAILED = "REGISTER_FORM_FAILED";
export const LOGIN_FORM_SUCCESS = "LOGIN_FORM_SUCCESS";
export const LOGIN_FORM_FAILED = "LOGIN_FORM_FAILED";
export const LOGOUT_FORM_SUCCESS = "LOGOUT_FORM_SUCCESS";
export const LOGOUT_FORM_FAILED = "LOGOUT_FORM_FAILED";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const AUTH_CHECK = "AUTH_CHECK";

export const passwordReset = (url, email) => {
    return async function (dispatch) {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
            .then((res) => {
                return checkResponse(res);
            })
            .then(() => {
                dispatch({
                    type: RESET_FORM_SUCCESS,
                });
            })
            .catch(() => {
                dispatch({ type: RESET_FORM_FAILED });
            });
    };
};

export const passwordUpdate = (url, form) => {
    return function (dispatch) {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then(checkResponse)
            .then(() => {
                dispatch({
                    type: UPDATE_FORM_SUCCESS,
                });
            })
            .catch(() => {
                dispatch({ type: UPDATE_FORM_FAILED });
            });
    };
};

export const registerUser = (url, form) => {
    return async function (dispatch) {
        return await fetchWithRefresh(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then((data) => {
                dispatch({
                    type: REGISTER_FORM_SUCCESS,
                    payload: data.user,
                });
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                dispatch({ type: SET_USER_SUCCESS, payload: data.user });
                dispatch({ type: AUTH_CHECK, payload: true });
            })
            .catch(() => {
                dispatch({ type: REGISTER_FORM_FAILED });
            });
    };
};

export const loginUser = (url, form) => {
    return async function (dispatch) {
        return await fetchWithRefresh(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then((data) => {
                dispatch({
                    type: LOGIN_FORM_SUCCESS,
                    payload: data.user,
                });
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                dispatch({ type: SET_USER_SUCCESS, payload: data.user });
                dispatch({ type: AUTH_CHECK, payload: true });
            })
            .catch(() => {
                dispatch({ type: LOGIN_FORM_FAILED });
            });
    };
};

export const logOut = (url) => {
    return function (dispatch) {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        })
            .then(checkResponse)
            .then(() => {
                dispatch({
                    type: LOGOUT_FORM_SUCCESS,
                    payload: null,
                });
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            })
            .catch(() => {
                dispatch({ type: LOGOUT_FORM_FAILED });
            });
    };
};

export const getUser = () => {
    return async function (dispatch) {
        return await fetchWithRefresh(`${baseUrl}/auth/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken"),
            },
        })
            .then((data) => {
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: data.user,
                });
            })
            .catch(() => {
                dispatch({ type: SET_USER_FAILED });
            });
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch({ type: SET_USER_SUCCESS, payload: null });
                })
                .finally(() => {
                    dispatch({ type: AUTH_CHECK, payload: true });
                });
        } else {
            dispatch({ type: AUTH_CHECK, payload: true });
        }
    };
};

export const updateUserData = (url, form) => {
    return async function (dispatch) {
        return await fetchWithRefresh(`${baseUrl}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(form),
        })
            .then((data) => {
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: data.user,
                });
                dispatch({ type: AUTH_CHECK, payload: true });
            })
            .catch(() => {
                dispatch({
                    type: SET_USER_FAILED,
                });
            });
    };
};
