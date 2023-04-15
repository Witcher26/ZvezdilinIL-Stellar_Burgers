import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientDetails from "./burger-ingredients.module.css"
import PropTypes from "prop-types";

const IngredientItem = ({item}) => {
    
    return (
        <div className={ingredientDetails.ingredient_item}>
            <Counter count={1} extraClass="counter"/>
            <img src={item.image} alt={item.name}/>
            <p className={ingredientDetails.display_flex}>
                    {item.price}
                <CurrencyIcon type="primary"/>
            </p>
            <p className={ingredientDetails.ingredient_item_name}>
                {item.name}
            </p>
        </div>
    )
}

IngredientItem.propTypes = {
    /*
        Отдельный ингредиент для отображения в ленте
    */
    item: PropTypes.object.isRequired,
};

export default IngredientItem