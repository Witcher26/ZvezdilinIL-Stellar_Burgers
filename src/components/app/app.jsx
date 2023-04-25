import React from 'react';
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients/burger-ingredients';

import BurgerConstructor from '../burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredients/ingredient-details';
import OrderDetails from '../burger-ingredients/ingredient-details/order-details';

import app from "./app.module.css";

import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { 
        getIngredients,
        SET_ACTIVE_INGREDIENT,
        DRAG_CONSTRUCTOR_INGREDIENTS,
        INCREASE_INGREDIENT,
        DRAG_BUN_INGREDIENT,
        CLOSE_MODAL
} from '../../services/actions/actions';

import { v4 as uuid } from "uuid";
import { baseUrl } from '../../env';

const ingredientsUrl = baseUrl+"ingredients";

function App() {
    const ingredientsModal = useSelector(store => store.ingredientsModal);
    const orderModal = useSelector(store => store.orderModal);

    const dispatch = useDispatch();
    const dispatchModal = useDispatch();

    React.useEffect(() => {
        dispatch(getIngredients(ingredientsUrl));
    }, []);

    const onDropHandler = item => {
        dispatch({
            type: SET_ACTIVE_INGREDIENT,
            currentIngredient: item,
        })

        if (item.type !== "bun") {
            dispatch({
                type: DRAG_CONSTRUCTOR_INGREDIENTS,
                item: { ...item, key: uuid() },
            })
            dispatch({
                type: INCREASE_INGREDIENT,
                id: item._id,
            })
        } else {
            dispatch({
                type: DRAG_BUN_INGREDIENT,
                payload: { ...item, qty: ++item.qty },
            })
        }
    };

    const handleCloseModal = () => {
        dispatchModal({ type: CLOSE_MODAL });
        dispatchModal({ type: SET_ACTIVE_INGREDIENT, currentIngredient: {} });
    };

    return (
        <div className={app.page}>
            <AppHeader/>
            <div className={app.position}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor onDrop={onDropHandler}/>
                </DndProvider>
            </div>

            {ingredientsModal && 
                <Modal 
                    modalTitle="Детали ингредиента"
                    handleCloseModal={handleCloseModal}
                >
                    <IngredientDetails/>
                </Modal>}

            {orderModal &&
                <Modal handleCloseModal={handleCloseModal}>
                    <OrderDetails/>
                </Modal>} 
        </div>
    );
}

export default App;