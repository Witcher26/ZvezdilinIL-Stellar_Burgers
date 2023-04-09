import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const IngredientItem = ({item}) => {
    return (
        <>
            <div className="ingredient_item" >
                <Counter count={1} extraClass="counter"/>
                <img className="" src={item.image} alt={item.name}/>
                <p className="display_flex">
                    <span className="">
                        {item.price}
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
                <p className="ingredient_item_name">
                    {item.name}
                </p>
            </div>
        </>
    )
}

IngredientItem.propTypes = {
    /*
        Отдельный ингредиент для отображения в ленте
    */
    item: PropTypes.object.isRequired,
};

export default IngredientItem