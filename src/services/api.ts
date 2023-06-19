import {
    TFormValues,
    TLoginResponse,
    TLogoutResponse,
    TRegisterResponse,
    TResetForm,
    TResetPasswordResponse,
    TSignInForm,
    TUserResponse,
    TUserForm,
    TOrderResponse,
    TIngredientsResponse,
    TFeedOrderResponse,
} from "../utils/types/types";
import { checkResponse } from "../utils/utils";
import { fetchWithRefresh } from "./auth";

export const getIngredientsRequest = async (url: string): Promise<TIngredientsResponse> => {
    return await fetch(url)
        .then(checkResponse<TIngredientsResponse>);
};

export const passwordResetRequest = async (url: string, email: string): Promise<TResetPasswordResponse> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    }).then((res) => {
        return checkResponse<TResetPasswordResponse>(res);
    });
};

export const passwordUpdateRequest = async (url: string, form: TResetForm): Promise<TResetPasswordResponse> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    }).then(checkResponse<TResetPasswordResponse>);
};

export const registerUserRequest = async (url: string, form: TFormValues): Promise<TRegisterResponse> => {
    return await fetchWithRefresh(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    });
};

export const loginUserRequest = async (url: string, form: TSignInForm): Promise<TLoginResponse> => {
    return await fetchWithRefresh(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    });
};

export const getUserRequest = async (url: string): Promise<TUserResponse> => {
    return await fetchWithRefresh(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken")
        } as HeadersInit
    });
};

export const logOutRequest = async (url: string): Promise<TLogoutResponse> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        })
    }).then(checkResponse<TLogoutResponse>);
};

export const updateUserRequest = async (url: string, form: TUserForm): Promise<TUserResponse> => {
    return await fetchWithRefresh(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken")
        } as HeadersInit,
        body: JSON.stringify(form)
    });
};

export const submitOrderRequest = async (url: string, idArray: string[]): Promise<TOrderResponse> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken")
        } as HeadersInit,
        body: JSON.stringify({
            ingredients: idArray
        }),
    }).then(checkResponse<TOrderResponse>);
};

export const getOrderRequest = async (url: string, id: string): Promise<TFeedOrderResponse> => {
    return await fetch(`${url}/${id}`)
        .then(checkResponse<TFeedOrderResponse>);
};