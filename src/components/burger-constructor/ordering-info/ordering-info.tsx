import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderingInfo from "./ordering-info.module.css";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ORDER_MODAL, submitOrder } from "../../../services/actions/actions";
import { baseUrl } from "../../../env";
import { TIngredient } from "../../../utils/types/types";
import { useNavigate } from 'react-router-dom';

const urlOrders = baseUrl + "/orders";

const OrderingInfo = ({ finalPrice }: {finalPrice: number}): JSX.Element => {
    const constructorIngredients = useSelector(
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore       
        store => store.ingredientsReducer.constructorIngredients
    );
    const bun = useSelector(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store => store.bun
    );
    const user = useSelector(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store => store.formReducer.userInfo
    );

    const ingredientsIdArray = constructorIngredients.map((item: TIngredient) => item._id);

    const resultIdArr = bun
        ? [bun._id, ...ingredientsIdArray, bun._id]
        : [...ingredientsIdArray];
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const makeOrder = () => {
        if(!user) {
            navigate('/login');
            return;
        }
        if (resultIdArr.length < 1) {
            alert("Соберите уже этот вкусный бургер!")
            return;
        }
        if (user) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(submitOrder(urlOrders, resultIdArr));
            dispatch({ type: OPEN_ORDER_MODAL });
            return;
        }
    };

    return (
        <div className={`${orderingInfo.ordering_info} mt-10`}>
            <span className="text text_type_digits-medium mr-2">
                {finalPrice}
            </span>
            <CurrencyIcon type="primary" />
            <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass="ml-10 mr-3"
                onClick={makeOrder}
            >
                Оформить заказ
            </Button>
        </div>
    );
};

export default OrderingInfo;