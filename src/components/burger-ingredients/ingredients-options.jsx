import  { forwardRef } from "react";
import burgerIngredientsList from "./burger-ingredients-list.module.css";
import IngredientItem from "./ingredient-item/ingredient-item";
import {
    SET_ACTIVE_INGREDIENT,
    OPEN_INGREDIENTS_MODAL
} from "../../services/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

const IngredientsOptions= forwardRef(function BurgerIngredientsList({ingredientsType}, ref) {
    const ingredientsData = useSelector(store => store.ingredientsReducer.ingredientsData);
    const dispatch = useDispatch();

    const addTitle = string => {
        let title = "";
        switch (string) {
            case "bun":
                title = "Булки";
                break;
            case "sauce":
                title = "Соусы";
                break;
            case "main":
                title = "Начинки";
                break;
            default:
                title = "";
        }
        return (
            <h3 ref={ref} className="text text_type_main-medium mb-6">
                {title}
            </h3>
        );
    };

    const handleClick = item => {
        dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: item });
        dispatch({ type: OPEN_INGREDIENTS_MODAL });
    };

    const newData = ingredientsData.map(item => {
        return { ...item, qty: 0 };
    });

    const buildLayout = (string, ref) => {
        return (
            <>
                {ingredientsData && string ? (
                    <>
                        {addTitle(string, ref)}
                        <ul className={`${burgerIngredientsList.list} ml-0 pl-1 pr-1`} >
                            {newData
                                .filter(item => {
                                    return item.type === ingredientsType;
                                })
                                .map(item => {
                                    return (
                                        <li key={item._id}
                                            onClick={() => handleClick(item)}
                                            aria-hidden="true">
                                            <IngredientItem ingredient={item}/>
                                        </li>
                                    );
                                })}
                        </ul>
                    </>
                ) : null}       
            </>
        );
    };

    return <div>{buildLayout(ingredientsType, ref)}</div>;
});

IngredientsOptions.propTypes = {
    /*
        тип игредиента
    */
    ingredientsType: PropTypes.string,
};

export default IngredientsOptions;