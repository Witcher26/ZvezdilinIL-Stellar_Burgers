import styles from "./burger-order-expanded.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../hooks/hooks";
import { TFeedOrder, TIngredient } from "../../../utils/types/types";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { addIngredients } from "../../../utils/utils";

export const BurgerCardExpanded = (props: { order: TFeedOrder | null }) => {
    const currentOpened = props.order;

    const ingredientsData = useSelector(store => store.ingredientsReducer.ingredientsData);

    const orderIngredients = addIngredients<TIngredient, string>(ingredientsData, currentOpened?.ingredients!);

    const totalPrice = orderIngredients.reduce(
        (acc: number, ingredient: TIngredient) => {
            return acc + ingredient.price;
        }, 0
    );

    const accObject: Record<string, number> = {};

    currentOpened?.ingredients.forEach((item) => {
        if (accObject[item] === undefined) {
            accObject[item] = 1;
        } else {
            accObject[item]++;
        }
    });

    const set = [...new Set(orderIngredients)];

    return (
        <div className={styles.container}>
            <p
                className={`mb-10 text text_type_digits-default ${styles.order_number}`}
            >
            #{currentOpened?.number}
            </p>
        <h2 className="mb-3 text text_type_main-medium">{currentOpened?.name}</h2>
        <p className={`mb-15 text text_type_main-default ${styles.status}`}>
            {currentOpened?.status === "done" ? "Выполнен" : null}
        </p>
        <p className="mb-6 text text_type_main-medium">Состав:</p>
        <ul className={`${styles.list} mb-10 custom-scroll`}>
        {set.map(({ name, price, image, _id }, index): JSX.Element => {
            return (
                <li key={index} className={`${styles.item} mb-4`}>
                    <img src={image} alt="" />
                    <p className={`${styles.name} text text_type_main-default`}>
                        {name}
                    </p>
                        <p className={styles.price}>
                        <span className="text text_type_digits-default">
                            {accObject[_id]} x {price}
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                </li>
            );
        })}
        </ul>
        <div className={styles.info_column}>
            <span className="text text_type_main-default text_color_inactive">
                {<FormattedDate date={new Date(currentOpened?.createdAt!)} />}
            </span>
            <span className={styles.price}>
                <span className="text text_type_digits-default">{totalPrice}</span>
                <CurrencyIcon type="primary" />
            </span>
        </div>
        </div>
    );
};