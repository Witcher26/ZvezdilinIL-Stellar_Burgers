import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderingInfo from "./ordering-info.module.css";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { OPEN_ORDER_MODAL } from "../../../services/constants";
import { baseUrl } from "../../../env";
import { TIngredient } from "../../../utils/types/types";
import { useNavigate } from 'react-router-dom';
import { submitOrder } from "../../../services/actions/orderActions";

const urlOrders = baseUrl + "/orders";

const OrderingInfo = ({ finalPrice }: {finalPrice: number}): JSX.Element => {
    const constructorIngredients = useSelector(store => store.ingredientsReducer.constructorIngredients);
    const bun = useSelector(store => store.ingredientsReducer.bun);
    let user = useSelector(store => store.formReducer.userInfo);

    const ingredientsIdArray = constructorIngredients.map((item: TIngredient) => item._id);
    const resultIdArr = bun ? [bun._id, ...ingredientsIdArray, bun._id] : [...ingredientsIdArray];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const makeOrder = () => {
        if(!user) {
            const value = sessionStorage.getItem("UserInfoRegistration");
            user = !!value ? JSON.parse(value) : {};
        }

        if (user) {
            if (bun) {
                dispatch(submitOrder(urlOrders, resultIdArr));
                dispatch({ type: OPEN_ORDER_MODAL });
            } else {
                alert("Соберите уже этот вкусный бургер!");
            }
        } else {
            navigate("/login", {
                replace: true
            });
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