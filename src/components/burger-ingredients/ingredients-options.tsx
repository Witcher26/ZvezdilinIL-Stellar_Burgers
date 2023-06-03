import  { forwardRef } from "react";
import burgerIngredientsList from "./burger-ingredients-list.module.css";
import IngredientItem from "./ingredient-item/ingredient-item";
import {
    SET_ACTIVE_INGREDIENT,
    OPEN_INGREDIENTS_MODAL
} from "../../services/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { TIngredient } from "../../utils/types/types";

type TRef = HTMLDivElement | null;
type TIngredientsType = {
  ingredientsType: string;
};

const IngredientsOptions= forwardRef<TRef, TIngredientsType>(function BurgerIngredientsList({ingredientsType}, ref) {
    const ingredientsData = useSelector(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store => store.ingredientsReducer.ingredientsData
    );
    
    const dispatch = useDispatch();

    const addTitle = (string: string) => {
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

    const handleClick = (item: TIngredient) => {
      dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: item });
      dispatch({ type: OPEN_INGREDIENTS_MODAL });
    };

    const newData = ingredientsData.map((item: TIngredient) => {
        return { ...item, qty: 0 };
    });

    const buildLayout = (string: string) => {
        return (
            <>
                {ingredientsData && string ? (
                    <>
                        {addTitle(string)}
                        <ul className={`${burgerIngredientsList.list} ml-0 pl-1 pr-1`} >
                            {newData
                                .filter((item: TIngredient) => {
                                    return item.type === ingredientsType;
                                })
                                .map((item: TIngredient): JSX.Element | null => {
                                    return (
                                        <li key={item._id}
                                            onClick={() => handleClick(item)}
                                            aria-hidden="true"
                                        >
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

    return <div>{buildLayout(ingredientsType)}</div>;
});

export default IngredientsOptions;