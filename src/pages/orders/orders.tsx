import styles from "./orders.module.css"
import NavigationMenu from "../../components/navigation-menu/navigation-menu";

export const OrderPage = () => {
    return (
        <>
            <div className={styles.container}>
                <NavigationMenu desc="Лента ваших заказов" />
                <h2 className="text text_type_main-large">
                    Раздел находится в разработке
                </h2>
            </div>
        </>
    );
};