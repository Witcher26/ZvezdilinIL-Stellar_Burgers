import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import burgerConstructorListItem from "./burger-constructor-list-item.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_INGREDIENT } from "../../../../services/actions/actions";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

const BurgerConstructorListItem = ({ item, index, moveIngredient }) => {
    const { name, price, image, _id } = item;
    const ref = useRef(null);

    const [{ isDragging }, dragRef] = useDrag({
        type: "ingredient",
        item: () => {
            return { _id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: "ingredient",
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const constructorIngredients = useSelector(store => store.ingredientsReducer.constructorIngredients);

    const dispatch = useDispatch();

    const removeElement = (item, index) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            payload: [
                ...constructorIngredients.slice(0, index),
                ...constructorIngredients.slice(index + 1),
            ],
        });
    };

    dragRef(dropRef(ref));

    return (
        <div
            ref={ref}
            className={`${burgerConstructorListItem.container} ${
                isDragging ? `${burgerConstructorListItem.hidden}` : ""
            } mt-4 mb-4`}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                extraClass="ml-3"
                handleClose={() => removeElement(item, index)}
            />
        </div>
    );
};

BurgerConstructorListItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    moveIngredient: PropTypes.func,
};

export default BurgerConstructorListItem;