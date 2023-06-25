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
    LOGOUT_FORM_FAILED
} from "../constants";
import { initialState, formReducer } from "./formReducer";
import { TFormActions } from "../actions/formActions";
import { TFormValues } from "../../utils/types/types";
  
const mockUserInfo: TFormValues = {
    email: "test@gmail.com",
    name: "test mockaev"
};
  
const mockAuth = true;
  
describe("form reducer", () => {
    it("should return initial state", () => {
      expect(formReducer(undefined, {} as TFormActions)).toEqual(initialState);
    });
  
    it("should set respective flag if reset form is failed", () => {
        expect(
            formReducer(initialState, {
                type: RESET_FORM_FAILED,
            })
        ).toEqual({
            ...initialState,
            resetFormFailed: true,
            resetFormSuccess: false,
        });
    });
  
    it("should set respective flag if reset form is succesful", () => {
        expect(
            formReducer(initialState, {
                type: RESET_FORM_SUCCESS,
            })
        )
        .toEqual({
            ...initialState,
            resetFormFailed: false,
            resetFormSuccess: true
        });
    });
  
    it("should set respective flag if update form is failed", () => {
        expect(
            formReducer(initialState, {
                type: UPDATE_FORM_FAILED,
            })
        )
        .toEqual({
            ...initialState,
            updateFormFailed: true,
            updateFormSuccess: false
        });
    });
  
    it("should set respective flag if update form is succesful", () => {
        expect(
            formReducer(initialState, {
                type: UPDATE_FORM_SUCCESS
        }))
        .toEqual({
            ...initialState,
            updateFormSuccess: true,
            updateFormFailed: false
        });
    });
  
    it("should set respective flag and fill user info if register form is succesful", () => {
        expect(
            formReducer(initialState, {
                type: REGISTER_FORM_SUCCESS,
                payload: mockUserInfo
        })
        )
        .toEqual({
            ...initialState,
            userInfo: mockUserInfo,
            registerFormSuccess: true,
            registerFormFailed: false,
        });
    });
  
    it("should set respective flag if register form is failed", () => {
      expect(
        formReducer(initialState, {
          type: REGISTER_FORM_FAILED,
        })
      ).toEqual({
        ...initialState,
        registerFormSuccess: false,
        registerFormFailed: true,
      });
    });
  
    it("should set respective flag and fill user info if login form is succesful", () => {
      expect(
        formReducer(initialState, {
          type: LOGIN_FORM_SUCCESS,
          payload: mockUserInfo,
        })
      ).toEqual({
        ...initialState,
        userInfo: mockUserInfo,
        loginFormSuccess: true,
        loginFormFailed: false,
      });
    });
  
    it("should set respective flag if login form is failed", () => {
      expect(
        formReducer(initialState, {
          type: LOGIN_FORM_FAILED,
        })
      ).toEqual({
        ...initialState,
        loginFormFailed: true,
        loginFormSuccess: false,
      });
    });
  
    it("should set respective flag if set user form is failed", () => {
      expect(
        formReducer(initialState, {
          type: SET_USER_FAILED,
        })
      ).toEqual({
        ...initialState,
        userInfoFailed: true,
        userInfoSuccess: false,
      });
    });
  
    it("should set respective flag and user info if set user form is successful", () => {
      expect(
        formReducer(initialState, {
          type: SET_USER_SUCCESS,
          payload: mockUserInfo,
        })
      ).toEqual({
        ...initialState,
        userInfoFailed: false,
        userInfoSuccess: true,
        userInfo: mockUserInfo,
      });
    });
  
    it("should set respective flag for checking authentication", () => {
      expect(
        formReducer(initialState, {
          type: AUTH_CHECK,
          payload: mockAuth,
        })
      ).toEqual({
        ...initialState,
        isAuthChecked: mockAuth,
      });
    });
  
    it("should set respective flag and logout user if set logout form is successful", () => {
      expect(
        formReducer(initialState, {
          type: LOGOUT_FORM_SUCCESS,
        })
      ).toEqual({
        ...initialState,
        logoutFormSuccess: true,
        logoutFormFailed: false,
        userInfo: null,
      });
    });
  
    it("should set respective flag if set logout form is failed", () => {
      expect(
        formReducer(initialState, {
          type: LOGOUT_FORM_FAILED,
        })
      ).toEqual({
        ...initialState,
        logoutFormSuccess: false,
        logoutFormFailed: true,
      });
    });
});
  