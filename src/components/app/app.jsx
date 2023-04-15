import React from 'react';
import AppHeader from '../app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import BurgerConstructor from '../burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredients/ingredient-details';
import OrderDetails from '../burger-ingredients/ingredient-details/order-details';

import app from "./app.module.css";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [modal, handleModal] = React.useState({
        ingredientsModal: false,
        orderModal: false,
    });

    const onHandleModal = (flag, type = "") => {
        if (flag) {
            if (type === "ingredients") {
                handleModal({
                    ...modal,
                    ingredientsModal: true,
                });
            } else if (type === "order") {
                handleModal({
                    ...modal,
                    orderModal: true,
                });
            }
        } else {
            handleModal({
                ingredientsModal: false,
                orderModal: false,
            });
        }
    };

    const [currentIngredient, setActiveIngredient] = React.useState({});

    const [state, setState] = React.useState({
        ingredientsData: [],
        loading: true,
        error: false,
    });

    const getIngredientsData = React.useCallback(() => {
        setState({ ...state, loading: true });
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Ошибка ${response.status}`);
            })
            .then(response => {
                setState(state => ({
                    ...state,
                    ingredientsData: response.data,
                    loading: false,
                }));
            })
            .catch(error => {
                setState({ 
                    ...state, 
                    error: true, 
                    loading: false 
            });
                console.log(error.message);
            });
    }, [state]);

    React.useEffect(() => {
        getIngredientsData();
    }, [])

    const getActiveIngredient = item => {
        setActiveIngredient(item);
    };

    return (
        <div className={app.page}>
            <AppHeader/>
            {state.ingredientsData.length > 0 && 
                <div className={app.position}>
                    <BurgerIngredients data={state.ingredientsData}
                                    getActiveIngredient={getActiveIngredient}
                                    openModal={onHandleModal}
                    
                    />
                    <BurgerConstructor data={state.ingredientsData}
                                    openModal={onHandleModal}/>
                </div>}
            {modal.ingredientsModal && (
                <Modal
                    modalTitle="Детали ингредиента"
                    closeModal={handleModal}
                >
                    <IngredientDetails
                        currentIngredient={currentIngredient}
                        closeModal={onHandleModal}
                    />
                </Modal>
            )}
            {modal.orderModal && (
                <Modal
                    closeModal={handleModal}
                >
                    <OrderDetails closeModal={onHandleModal}/>
                </Modal>
            )} 
        </div>
    );
}

export default App;