import {
    FEED_ORDER_CONNECT,
    FEED_ORDER_CONNECTING,
    FEED_ORDER_OPEN,
    FEED_ORDER_CLOSE,
    FEED_ORDER_MESSAGE,
    FEED_ORDER_ERROR,
    FEED_ORDER_CURRENT_ORDER,
    WS_BASE
} from "../constants";
import { TWsOrderActions } from "../actions/orderFeedActions";
import { feedState, feedOrderReducer } from "./feedOrderReducer";
  
const mockedToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzYwZGRlOGE0YjYyMDAxYzg1MDk5OCIsImlhdCI6MTY4NTQ2MTI5OSwiZXhwIjoxNjg1NDYyNDk5fQ.LGL3i9wkML_bHxua8y-H6XmXi3AR94gKNNajC_JQORY`;
const mockedUrl = `${WS_BASE}/orders?token=${mockedToken}`;
const mockedData = {
    success: true,
    orders: [
        {
        _id: "6468866a8a4b62001c83a4f2",
        ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Био-марсианский люминесцентный краторный spicy бургер",
        createdAt: "2023-05-20T08:35:54.074Z",
        updatedAt: "2023-05-20T08:35:54.126Z",
        number: 4656,
        },
        {
        _id: "646886d98a4b62001c83a4f5",
        ingredients: [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0944",
            "643d69a5c3f7b9001cfa093d",
        ],
        status: "done",
        name: "Традиционный-галактический флюоресцентный бургер",
        createdAt: "2023-05-20T08:37:45.837Z",
        updatedAt: "2023-05-20T08:37:45.958Z",
        number: 4657,
        },
        {
        _id: "646886e88a4b62001c83a4f6",
        ingredients: [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0944",
            "643d69a5c3f7b9001cfa093d",
        ],
        status: "done",
        name: "Традиционный-галактический флюоресцентный бургер",
        createdAt: "2023-05-20T08:38:00.754Z",
        updatedAt: "2023-05-20T08:38:00.852Z",
        number: 4658,
        },
        {
        _id: "646886ee8a4b62001c83a4f7",
        ingredients: [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0945",
            "643d69a5c3f7b9001cfa093d",
        ],
        status: "done",
        name: "Антарианский флюоресцентный spicy бургер",
        createdAt: "2023-05-20T08:38:06.941Z",
        updatedAt: "2023-05-20T08:38:07.085Z",
        number: 4659,
        },
        {
        _id: "6468870b8a4b62001c83a4f8",
        ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093d"],
        status: "done",
        name: "Флюоресцентный бургер",
        createdAt: "2023-05-20T08:38:35.318Z",
        updatedAt: "2023-05-20T08:38:35.369Z",
        number: 4660,
        },
        {
        _id: "646887258a4b62001c83a4f9",
        ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Краторный spicy бургер",
        createdAt: "2023-05-20T08:39:01.393Z",
        updatedAt: "2023-05-20T08:39:01.463Z",
        number: 4661,
        },
        {
        _id: "646887398a4b62001c83a4fa",
        ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Краторный spicy бургер",
        createdAt: "2023-05-20T08:39:21.492Z",
        updatedAt: "2023-05-20T08:39:21.554Z",
        number: 4662,
        },
        {
        _id: "646887a58a4b62001c83a4fb",
        ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"],
        status: "done",
        name: "Краторный бургер",
        createdAt: "2023-05-20T08:41:09.813Z",
        updatedAt: "2023-05-20T08:41:09.869Z",
        number: 4663,
        },
        {
        _id: "646887f38a4b62001c83a4fc",
        ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0943",
            "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Space краторный бургер",
        createdAt: "2023-05-20T08:42:27.029Z",
        updatedAt: "2023-05-20T08:42:27.082Z",
        number: 4664,
        },
        {
        _id: "646888148a4b62001c83a4fd",
        ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Краторный spicy бургер",
        createdAt: "2023-05-20T08:43:00.891Z",
        updatedAt: "2023-05-20T08:43:00.979Z",
        number: 4665,
        },
        {
        _id: "646888418a4b62001c83a4fe",
        ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Краторный spicy бургер",
        createdAt: "2023-05-20T08:43:45.464Z",
        updatedAt: "2023-05-20T08:43:45.559Z",
        number: 4666,
        },
        {
        _id: "646889058a4b62001c83a505",
        ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0944",
            "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Традиционный-галактический краторный бургер",
        createdAt: "2023-05-20T08:47:01.353Z",
        updatedAt: "2023-05-20T08:47:01.453Z",
        number: 4667,
        },
    ],
    total: 5766,
    totalToday: 133,
};
const mockedOrder = {
    _id: "6468866a8a4b62001c83a4f2",
    ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093c",
    ],
    status: "done",
    name: "Био-марсианский люминесцентный краторный spicy бургер",
    createdAt: "2023-05-20T08:35:54.074Z",
    updatedAt: "2023-05-20T08:35:54.126Z",
    number: 4656,
};

describe("feed order reducer", () => {
    it("should return initial state", () => {
        expect(feedOrderReducer(undefined, {} as TWsOrderActions)).toEqual(
        feedState
        );
    });

    it("should return state while it connecting", () => {
        expect(
        feedOrderReducer(feedState, {
            type: FEED_ORDER_CONNECTING,
        })
        ).toEqual({
        ...feedState,
        });
    });

    it("should return state when it connected", () => {
        expect(
        feedOrderReducer(feedState, {
            type: FEED_ORDER_CONNECT,
            payload: mockedUrl,
        })
        ).toEqual({
        ...feedState,
        });
    });

    it("should return state and empty error field when it opened", () => {
        expect(
        feedOrderReducer(feedState, {
            type: FEED_ORDER_OPEN,
        })
        ).toEqual({
        ...feedState,
        connectingError: "",
        });
    });

    it("should return state and fill received answer from ws when it has message", () => {
        expect(
        feedOrderReducer(feedState, {
            type: FEED_ORDER_MESSAGE,
            payload: mockedData,
        })
        ).toEqual({
        ...feedState,
        ordersList: mockedData.orders,
        });
    });

    it("should return state when it closed", () => {
        expect(
        feedOrderReducer(feedState, {
            type: FEED_ORDER_CLOSE,
        })
        ).toEqual({
        ...feedState,
        });
    });

    it("should return state and error when it has errors", () => {
        expect(
        feedOrderReducer(feedState, {
            type: FEED_ORDER_ERROR,
            payload: "error",
        })
        ).toEqual({
        ...feedState,
        connectingError: "error",
        });
    });

    it("should return state and current opened order in feed", () => {
        expect(
        feedOrderReducer(feedState, {
            type: FEED_ORDER_CURRENT_ORDER,
            payload: mockedOrder,
        })
        ).toEqual({
        ...feedState,
        currentOrder: mockedOrder,
        });
    });
});
  