import styles from "./order-report.module.css";
import { useSelector } from "../hooks/hooks";
import { TFeedOrder } from "../../utils/types/types";

export const OrderReport = () => {
    const orders = useSelector(store => store.feedReducer.ordersList);
    const total = useSelector(store => store.feedReducer.total);
    const totalToday = useSelector(store => store.feedReducer.totalToday);

    const doneItems = orders.filter(item => {
        return item.status === "done";
    });

    const proccessItems = orders.filter(item => {
        return item.status !== "done";
    });

    const separateItems = (items: TFeedOrder[]) => {
        const resultArr = [];
        const end = items.length / 10;

        for (let i = 0; i < end; i++) {
            resultArr.push([...items.splice(0, 10)]);
        }

        return resultArr;
    };

    const doneItemsArr = separateItems(doneItems);

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className="mr-9">
                    <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                    <div className={styles.list_container}>
                        {doneItemsArr.map((item, index) => {
                            return (
                                <ul key={index}>
                                    {item.map((child) => {
                                        return (
                                            <li
                                                key={child._id}
                                                className={`${styles.text} text text_type_digits-default mb-2`}
                                            >
                                                {child.number}
                                            </li>
                                        );
                                    })}
                                </ul>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h2 className="text text_type_main-medium mb-6">В Работе:</h2>
                    <ul>
                        {proccessItems.map(item => {
                            return (
                                <li
                                    key={item._id}
                                    className={`${styles.text} text text_type_digits-default mb-2`}
                                >
                                    {item.number}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <h2 className="text text_type_main-medium mb-6">Выполнено за все время:</h2>
            <p className="text text_type_digits-large mb-15">{total}</p>
            <h2 className="text text_type_main-medium mb-6">Выполнено за сегодня:</h2>
            <p className="text text_type_digits-large">{totalToday}</p>
        </div>
    );
};