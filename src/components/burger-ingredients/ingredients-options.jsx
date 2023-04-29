import  { forwardRef } from "react";
import burgerIngredientsList from "./burger-ingredients-list.module.css";
import IngredientItem from "./ingredient-item/ingredient-item";
import {
    ADD_INGREDIENT,
    SET_ACTIVE_INGREDIENT,
    OPEN_INGREDIENTS_MODAL,
    ADD_BUN,
    INCREASE_INGREDIENT,
} from "../../services/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

const IngredientsOptions= forwardRef(function BurgerIngredientsList(
    { ingredientsType },
    ref
) {
    const constructorIngredients = useSelector(
        (store) => store.constructorIngredients
    );
    const ingredientsData = useSelector((store) => store.ingredientsData);

    const dispatch = useDispatch();

    const addTitle = (string) => {
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

    const handleClick = (item) => {
        dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: item });
        // if (item.type !== "bun") {
        //     dispatch({
        //         type: ADD_INGREDIENT,
        //         payload: [...constructorIngredients, { ...item, key: uuid() }],
        //     });
        //     dispatch({
        //         type: INCREASE_INGREDIENT,
        //         id: item._id,
        //     });
        // } else {
        //     dispatch({
        //         type: ADD_BUN,
        //         payload: { ...item, qty: ++item.qty },
        //     });
        // }
        dispatch({ type: OPEN_INGREDIENTS_MODAL });
    };

    const newData = ingredientsData.map((item) => {
        return { ...item, qty: 0 };
    });

    const buildLayout = (string, ref) => {
        return (
            <div>
                {ingredientsData && string ? (
                    <div>
                        {addTitle(string, ref)}
                        <ul className={`${burgerIngredientsList.list} ml-0 pl-1 pr-1`} >
                            {newData
                                .filter((item) => {
                                    return item.type === ingredientsType;
                                })
                                .map((item) => {
                                    return (
                                        <li key={item._id}
                                            onClick={() => handleClick(item)}
                                            aria-hidden="true">
                                            <IngredientItem ingredient={item}/>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                ) : null}
            </div>
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