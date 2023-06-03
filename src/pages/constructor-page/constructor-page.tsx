import BurgerIngredients from '../../components/burger-ingredients';
import {BurgerConstructor} from '../../components';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/burger-ingredients/ingredient-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import app from './app.module.css';
import {
    SET_ACTIVE_INGREDIENT,
    DRAG_CONSTRUCTOR_INGREDIENTS,
    INCREASE_INGREDIENT,
    DRAG_BUN_INGREDIENT,
    CLOSE_MODAL
} from '../../services/actions/actions';
import { v4 as uuid } from "uuid";
import { TIngredient } from '../../utils/types/types';

const ConstructorPage = () => {
    const dispatch = useDispatch();
    const dispatchModal = useDispatch();

    const orderModal = useSelector(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store => store.modalReducer.orderModal);
    
    const handleCloseModal = () => {
        dispatchModal({ type: CLOSE_MODAL });
        dispatchModal({ type: SET_ACTIVE_INGREDIENT, currentIngredient: {} });
    };

    const onDropHandler = (item: TIngredient) => {
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

    return(
        <div className={app.page}>
            <div className={app.position}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor onDrop={onDropHandler}/>
                </DndProvider>
            </div>
            {orderModal &&
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Modal handleCloseModal={handleCloseModal}>
                    <OrderDetails/>
                 </Modal>} 
        </div>
    )
}

export default ConstructorPage;