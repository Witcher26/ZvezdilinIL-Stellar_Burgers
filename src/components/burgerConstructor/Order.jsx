import React from "react";
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import "./styles.css"

const Order = ({ finalPrice}) => {
    return (
        <div className="text_price">
            {finalPrice}
            <CurrencyIcon type="primary"/>
            <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass="order-button-position"
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
};

export default Order