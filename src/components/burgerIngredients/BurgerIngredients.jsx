import React from "react";
import Tabs from "./Tabs";
import data from '../../data/data.js'
import IngredientsOptions from "./IngredientsOptions";

import './styles.css';

const BurgerIngredients = () => {
    const [currentIngredient, setCurrentIngredient] = React.useState({});
    return (
        <>
            <div className="burger-box">
                <h2 className="text_type_main-large">
                    Соберите бургер
                </h2>
                <div className="burger-text-position custom-scroll">
                    <Tabs setCurrentIngredient={setCurrentIngredient}/>
                    <IngredientsOptions currentIngredient={currentIngredient}
                                        data={data}
                    />
                </div>
            </div>
        </>
    );
};

export default BurgerIngredients;