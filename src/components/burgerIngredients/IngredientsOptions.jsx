import React from "react";
import IngredientItem from "./IngredientItem";
import PropTypes from "prop-types";

const IngredientsOptions = ({currentIngredient, data}) => {
    
    const ingredientOptions = data.filter(item => item.type === currentIngredient);

    return (
        <>
            <ul id="dispaly_inline" className="dispaly_grid">
                {ingredientOptions.map(item => {
                    return (
                        <li className="list"
                            key={item.key}
                            onClick={()=>{}}
                            // aria-hidden="true"
                        >
                            <IngredientItem item={item}/>
                        </li> 
                )})}
            </ul>
        </>
)}

IngredientsOptions.propTypes = {
    /*
        Выбранный ингредиент на главной панели: булки, соусы или начинки
    */
    currentIngredient: PropTypes.string.isRequired,
    /*
        Массив с ингредиентами
    */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientsOptions