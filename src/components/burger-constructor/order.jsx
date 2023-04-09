import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import burgerConstructor from "./burger-constructor.module.css"

const Order = ({ finalPrice, openModal}) => {
    return (
        <div className={burgerConstructor.text_price}>
            {finalPrice}
            <CurrencyIcon type="primary"/>
            <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass="order-button-position"
                onClick={() => openModal(true, "order")}
            >
                Оформить заказ
            </Button>
        </div>
    );
};

Order.propTypes = {
    /*
        Конечная цена бургера
    */
    finalPrice: PropTypes.number,
    /*
       Функция вызова модального окна
    */
    openModal: PropTypes.func.isRequired
};

export {Order}