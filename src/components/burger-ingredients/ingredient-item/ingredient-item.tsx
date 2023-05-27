import React from "react";
import burgerItem from "./burger-item.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";
import { TIngredient } from "../../../utils/types/types";

type TIngredientProps = {
    ingredient: TIngredient;
  };

const IngredientItem = ({ ingredient }: TIngredientProps): JSX.Element | null => {
    const { image, price, name } = ingredient;

    const constructorIngredients = useSelector(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store => store.ingredientsReducer.constructorIngredients
    );
    const bun = useSelector(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store => store.ingredientsReducer.bun
    );

    const currentElAmount = constructorIngredients.filter((item: TIngredient) => item._id === ingredient._id).length;

    const [{ isDrag }, dragRef] = useDrag({
        type: ingredient.type,
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const counter = currentElAmount ? currentElAmount : 0;

    const renderCounter = () => {
        if (ingredient.type !== "bun") {
            if (counter) {
                return (
                    <Counter count={counter} extraClass={burgerItem.counter} />
                );
            }
        } else {
            if (bun && bun._id === ingredient._id && bun.qty) {
                return (
                    <Counter count={bun.qty} extraClass={burgerItem.counter} />
                );
            }
        }
    };

    const count = renderCounter();
    const location = useLocation();
    const ingredientId = ingredient._id;

    return !isDrag ? (
        <Link key={ingredientId}
                to={`/ingredients/${ingredientId}`}
                state={{ background: location }}
                className={burgerItem.link}
        
        >
            <div ref={dragRef} className={`${burgerItem.card} mb-10 ml-3 mr-3`}>
                {count}
                <img className="ml-4 mr-4" src={image} alt={name} />
                <p className={`${burgerItem.price} mt-1 mb-1`}>
                    <span className="text text_type_digits-default mr-2">
                        {price}
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
                <p className={`${burgerItem.name} text text_type_main-default`}>
                    {name}
                </p>
            </div>
        </Link>
    ): null
};

export default IngredientItem;
