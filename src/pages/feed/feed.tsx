import React, { useEffect } from "react";
import BurgerOrderList from "../../components/burger-order-list/burger-order-list";
import styles from "./feed.module.css";
import { OrderReport } from "../../components/order-report/order-report";
import { useSelector, useDispatch } from "../../components/hooks/hooks";
import { FEED_CONNECT, FEED_DISCONNECT } from "../../services/constants";

export const FeedPage = () => {
    const orders = useSelector(store => store.feedReducer.ordersList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: FEED_CONNECT,
            payload: "wss://norma.nomoreparties.space/orders/all"
        });

        return () => {
            dispatch({
                type: FEED_DISCONNECT,
                payload: "disconnect"
            });
        };
    }, []);

    return (
        <div className={styles.page_container}>
            <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
            <div className={styles.container}>
                <div className={`${styles.list_container}`}>
                    <BurgerOrderList orders={orders} to={"feed"} />
                </div>
                <OrderReport />
            </div>
        </div>
        );
};
