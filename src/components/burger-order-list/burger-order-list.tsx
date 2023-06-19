import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BurgerOrder from "./burger-order/burger-order";
import styles from "./burger-order-list.module.css";
import { useDispatch } from "../hooks/hooks";
import {
    OPEN_CARD_MODAL,
    FEED_CURRENT_ORDER,
    FEED_ORDER_CURRENT_ORDER,
    OPEN_CARD_ORDER_MODAL
} from "../../services/constants";
import { TFeedOrder } from "../../utils/types/types";

type TProps = {
    orders: TFeedOrder[];
    to: string;
};

const BurgerOrderList = (props: TProps): JSX.Element | null => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleOpenClick = (item: TFeedOrder) => {
        if (props.to === "feed") {
            dispatch({ type: OPEN_CARD_MODAL });
            dispatch({ type: FEED_CURRENT_ORDER, payload: item });
        }
        if (props.to === "profile/orders") {
            dispatch({ type: OPEN_CARD_ORDER_MODAL });
            dispatch({ type: FEED_ORDER_CURRENT_ORDER, payload: item });
        }
    };

    return props.orders ? (
        <ul className={`${styles.order_list} ml-15 custom-scroll`}>
            {[...props.orders].map((item) => {
                return (
                    item && (
                        <li
                            onClick={() => handleOpenClick(item)}
                            className={`${styles.item} mb-6`}
                            key={item._id}
                        >
                            <Link
                                to={`/${props.to}/${item.number}`}
                                state={{ background: location }}
                            >
                                <BurgerOrder order={item} />
                            </Link>
                        </li>
                    )
                );
            })}
        </ul>
    ) : null;
};

export default BurgerOrderList;