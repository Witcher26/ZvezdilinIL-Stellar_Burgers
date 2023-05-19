import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetails from "./order-details.module.css"
import { useSelector } from "react-redux";

function OrderDetails() {
    const order = useSelector(store => store.orderReducer.order);
    return (
        <div className={orderDetails.display_flex}>
            <p className="text text_type_digits-large pb-8">
                {order.number}
            </p>
            <p className="text text_type_main-medium pb-15">
                идентификатор заказа
            </p>
            <div className={orderDetails.text_position}>
                <span className={orderDetails.checkMarkIcon_position}>
                    <CheckMarkIcon type="primary"/>
                </span>
            </div>
            <p className="text text_type_main-default pb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}

export default OrderDetails;