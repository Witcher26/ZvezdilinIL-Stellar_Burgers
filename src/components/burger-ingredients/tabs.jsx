import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientDetails from "./burger-ingredients.module.css"
import PropTypes from "prop-types";
 
const Tabs = ({setCurrentIngredient}) => {
    const [current, setCurrent] = React.useState("bun");

    const setIngredient = (ingredient) => {
        setCurrent(ingredient);
        setCurrentIngredient(ingredient);
    }

    return (
        <div className={ingredientDetails.display_flex}>
            <Tab value="bun" active={current === 'bun'} onClick={setIngredient}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setIngredient}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setIngredient}>
                Начинки
            </Tab>
        </div>
    );
};

Tabs.propTypes = {
    /*
        Функция установки текущего ингредиента
    */
    setCurrentIngredient: PropTypes.func.isRequired,
};

export default Tabs