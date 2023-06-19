import { useEffect } from "react";
import { BurgerCardExpanded } from "../../components/burger-order-list/burger-order-expanded/burger-order-expanded";
import styles from "./order-card-page.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../components/hooks/hooks";
import { getOrder } from "../../services/actions/orderFeedActions";

export const OrderCardPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const loading = useSelector(store => store.feedReducer.loading);
    const error = useSelector(store => store.feedReducer.error);
    const order = useSelector(store => store.feedReducer.orderDetails);
    useEffect(() => {
        if (id) {
            dispatch(getOrder(id));
        }
    }, []);

    return (
        <>
            {!error ? (
                order && 
                    !loading ? (
                    <div className={styles.container}>
                        <BurgerCardExpanded order={order} />
                    </div>
                ) : (
                "Загружаем"
                )
            ) : null}
        </>
    );
};