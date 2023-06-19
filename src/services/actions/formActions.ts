import {
    API_BASE,
    RESET_FORM_FAILED,
    RESET_FORM_SUCCESS,
    UPDATE_FORM_FAILED,
    UPDATE_FORM_SUCCESS,
    REGISTER_FORM_SUCCESS,
    REGISTER_FORM_FAILED,
    LOGIN_FORM_SUCCESS,
    LOGIN_FORM_FAILED,
    LOGOUT_FORM_SUCCESS,
    LOGOUT_FORM_FAILED,
    SET_USER_SUCCESS,
    SET_USER_FAILED,
    AUTH_CHECK,
} from "../constants";
import {
    passwordResetRequest,
    passwordUpdateRequest,
    registerUserRequest,
    loginUserRequest,
    logOutRequest,
    getUserRequest,
    updateUserRequest,
} from "../../services/api";
import {
    AppDispatch,
    AppThunk,
    TFormValues,
    TResetForm,
    TSignInForm,
    TUserForm,
} from "../../utils/types/types";
  
type TResetFormFailed = {
    readonly type: typeof RESET_FORM_FAILED;
};

type TResetFormSuccess = {
    readonly type: typeof RESET_FORM_SUCCESS;
};

type TUpdateFormSuccess = {
    readonly type: typeof UPDATE_FORM_SUCCESS;
};

type TUpdateFormFailed = {
    readonly type: typeof UPDATE_FORM_FAILED;
};

type TRegisterFormSuccess = {
    readonly type: typeof REGISTER_FORM_SUCCESS;
    readonly payload: TUserForm;
};

type TRegisterFormFailed = {
    readonly type: typeof REGISTER_FORM_FAILED;
};

type TLoginFormSuccess = {
    readonly type: typeof LOGIN_FORM_SUCCESS;
    readonly payload: TUserForm;
};

type TLoginFormFailed = {
    readonly type: typeof LOGIN_FORM_FAILED;
};

type TSetUserFailed = {
    readonly type: typeof SET_USER_FAILED;
};

type TSetUSerSuccess = {
    readonly type: typeof SET_USER_SUCCESS;
    readonly payload: TUserForm | null;
};

type TAuthCheck = {
    readonly type: typeof AUTH_CHECK;
    readonly payload: boolean;
};

type TLogoutFormSuccess = {
    readonly type: typeof LOGOUT_FORM_SUCCESS;
};

type TLogoutFormFailed = {
    readonly type: typeof LOGOUT_FORM_FAILED;
};
  
export type TFormActions =
    | TResetFormFailed
    | TResetFormSuccess
    | TUpdateFormSuccess
    | TUpdateFormFailed
    | TRegisterFormSuccess
    | TRegisterFormFailed
    | TLoginFormSuccess
    | TLoginFormFailed
    | TSetUserFailed
    | TSetUSerSuccess
    | TAuthCheck
    | TLogoutFormSuccess
    | TLogoutFormFailed;
  
export const passwordReset = (url: string, email: string): AppThunk => {
    return async function (dispatch) {
        passwordResetRequest(url, email)
            .then(() => {
                dispatch({
                    type: RESET_FORM_SUCCESS
                });
            })
            .catch(() => {
                dispatch({
                    type: RESET_FORM_FAILED
                });
            });
    };
};
  
export const passwordUpdate = (url: string, form: TResetForm): AppThunk => {
    return function (dispatch) {
        passwordUpdateRequest(url, form)
            .then(() => {
                dispatch({
                    type: UPDATE_FORM_SUCCESS
                });
            })
            .catch(() => {
                dispatch({ type: UPDATE_FORM_FAILED });
            });
    };
};
  
export const registerUser = (url: string, form: TFormValues): AppThunk => {
    return async function (dispatch) {
        registerUserRequest(url, form)
            .then(data => {
                dispatch({
                    type: REGISTER_FORM_SUCCESS,
                    payload: data.user
                });
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: data.user
                });
                dispatch({
                    type: AUTH_CHECK,
                    payload: true
                });
            })
            .catch(() => {
                dispatch({
                    type: REGISTER_FORM_FAILED
                });
            });
    };
};
  
export const loginUser = (url: string, form: TSignInForm): AppThunk => {
    return async function (dispatch) {
        loginUserRequest(url, form)
            .then(data => {
                dispatch({
                    type: LOGIN_FORM_SUCCESS,
                    payload: data.user,
                });
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: data.user
                });
                dispatch({
                    type: AUTH_CHECK,
                    payload: true
                });
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_FORM_FAILED
                });
            });
    };
};
  
export const logOut = (url: string): AppThunk => {
    return function (dispatch) {
        logOutRequest(url)
            .then(() => {
                dispatch({
                    type: LOGOUT_FORM_SUCCESS,
                    payload: null,
                });
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            })
            .catch(() => {
                dispatch({
                    type: LOGOUT_FORM_FAILED
                });
            });
    };
};
  
export const getUser = (): AppThunk<Promise<unknown>> => {
    return async function (dispatch: AppDispatch) {
        getUserRequest(`${API_BASE}/auth/user`)
            .then((data) => {
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: data.user,
                });
            })
            .catch(() => {
                dispatch({
                    type: SET_USER_FAILED
                });
            });
    };
};
  
export const checkUserAuth = (): AppThunk => {
    return async function (dispatch) {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");

                    dispatch({
                        type: SET_USER_SUCCESS,
                        payload: null
                    });
                })
                .finally(() => {
                    dispatch({
                        type: AUTH_CHECK,
                        payload: true
                    });
                });
        } else {
            dispatch({
                type: AUTH_CHECK,
                payload: true
            });
        }
    };
};
  
export const updateUserData = (url: string, form: TUserForm): AppThunk => {
    return async function (dispatch) {
        updateUserRequest(`${API_BASE}/auth/user`, form)
            .then(data => {
                dispatch({
                    type: SET_USER_SUCCESS,
                    payload: data.user
                });
                dispatch({
                    type: AUTH_CHECK,
                    payload: true
                });
            })
            .catch(() => {
                dispatch({
                    type: SET_USER_FAILED
                });
            });
    };
};
  