import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
 
const Tabs = ({setCurrentIngredient}) => {
    const [current, setCurrent] = React.useState("bun");

    const setIngredient = (ingredient) => {
        setCurrent(ingredient);
        setCurrentIngredient(ingredient);

        console.log("current in Tabs: ", current)
    }

    return (
        <div >
            <div style={{ display: 'flex' }}>
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