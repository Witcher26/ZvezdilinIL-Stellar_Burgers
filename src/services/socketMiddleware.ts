import type { Middleware } from "redux";
import { TWsActions } from "./actions/feedActions";
import { RootState } from "./store";
import {
    TFeedStoreActions,
    TFeedOrderStoreActions,
} from "../utils/types/types";

export const socketMiddleware = (wsActions: TFeedStoreActions | TFeedOrderStoreActions): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;

        return (next) => (action: TWsActions) => {
            const { dispatch } = store;
            const { type } = action;
            const { onInit, onClose, onOpen, onError, onMessage, onDisconnect } = wsActions;

            if (type === onInit) {
                socket = new WebSocket(action.payload);
            }

            if (socket) {

                /* открытие сокета */
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                /* ошибка соединения */
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                /* получение события от сервера */
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({
                        type: onMessage,
                        payload: parsedData
                    });
                };

                /* закрытие соединения */
                socket.onclose = event => {
                    dispatch({ type: onClose,
                        payload: event
                    });
                };

                if (type === onDisconnect) {
                    socket.close();
                    socket = null;
                }
            }
            next(action);
        };
    };
};