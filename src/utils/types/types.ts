import { ThunkAction } from "redux-thunk";
import { RootState } from "../../services/store";
import { TAppActions } from "../../services/actions";
import {
    FEED_OPEN,
    FEED_CLOSE,
    FEED_ERROR,
    FEED_MESSAGE,
    FEED_CONNECT,
    FEED_ORDER_OPEN,
    FEED_ORDER_CLOSE,
    FEED_ORDER_ERROR,
    FEED_ORDER_MESSAGE,
    FEED_ORDER_CONNECT,
    FEED_DISCONNECT,
    FEED_ORDER_DISCONNECT,
} from "../../services/constants";

export type AppThunk<TReturnType = void> = ThunkAction<
    TReturnType,
    RootState,
    unknown,
    TAppActions
>;

export type AppDispatch<TReturnType = void> = (action: TAppActions | AppThunk<TReturnType>) => TReturnType;

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    qty: number;
    type: string;
    _id: string;
};

export type TConstructorIngredient = TIngredient & { key: string };

export type TDropType = {
    onDrop: (item: TIngredient) => void;
};

export type TFormValues = {
    name: string;
    email: string;
    password?: string;
};

export type TEmail = Pick<TFormValues, "email">;

export type TResetForm = Pick<TFormValues, "password"> & { token: string };

export type TSignInForm = Omit<TFormValues, "name">;

export type TUserForm = Omit<TFormValues, "password">;

export type TResetPasswordResponse = { message: string; success: boolean };

export type TLogoutResponse = TResetPasswordResponse;

export type TRegisterResponse = {
    success: boolean;
    user: TUserForm;
    accessToken: string;
    refreshToken: string;
};

export type TLoginResponse = TRegisterResponse;

export type TUserResponse = TRegisterResponse;

export type TOrderDate = {
    createdAt: string | number | Date;
    updatedAt: string | number | Date;
};

export type TOwner = TUserForm & TOrderDate;

export type TOrder = {
    ingredients: TConstructorIngredient[];
    _id: string;
    owner: TOwner;
    status: string;
    name: string;
    number: number;
    price: number;
} & TOrderDate;

export type TOrderResponse = {
    success: boolean;
    name: string;
    order: TOrder;
};

export type TIngredientsResponse = {
    success: boolean;
    data: TIngredient[];
};

export type TFeedStoreActions = {
    onInit: typeof FEED_CONNECT;
    onOpen: typeof FEED_OPEN;
    onClose: typeof FEED_CLOSE;
    onError: typeof FEED_ERROR;
    onMessage: typeof FEED_MESSAGE;
    onDisconnect: typeof FEED_DISCONNECT;
};

export type TFeedOrderStoreActions = {
    onInit: typeof FEED_ORDER_CONNECT;
    onOpen: typeof FEED_ORDER_OPEN;
    onClose: typeof FEED_ORDER_CLOSE;
    onError: typeof FEED_ORDER_ERROR;
    onMessage: typeof FEED_ORDER_MESSAGE;
    onDisconnect: typeof FEED_ORDER_DISCONNECT;
};

export type TFeed = {
    success: boolean;
    orders: TFeedOrder[];
    total: number;
    totalToday: number;
};

export type TFeedOrder = {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string | number | Date;
    updatedAt: string;
    number: number;
};

export type TFeedOrderResponse = Pick<TFeed, "success" | "orders">;