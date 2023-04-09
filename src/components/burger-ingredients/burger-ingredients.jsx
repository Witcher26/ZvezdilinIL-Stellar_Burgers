import React from "react";
import Tabs from "./tabs.jsx";
import PropTypes from "prop-types";
import burgerIngredients from "./burger-ingredients.module.css"
import IngredientsOptions from "./ingredients-options.jsx";

const BurgerIngredients = ({data, getActiveIngredient, openModal}) => {
    const [currentIngredient, setCurrentIngredient] = React.useState("bun");

    const handleClick = (item) => {
        setCurrentIngredient(item);
    }
    
    return (
        <div className={burgerIngredients.burger_box}>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h2>
            <div className={`${burgerIngredients.burger_text_position} custom-scroll`}>
                <Tabs setCurrentIngredient={handleClick}/>
                <IngredientsOptions currentIngredient={currentIngredient}
                                    data={data}
                                    openModal={openModal}
                                    getActiveIngredient={getActiveIngredient}
                />
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {
    /*
        Массив с ингредиентами
    */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    /*
       Функция вызова модального окна
    */
    openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;