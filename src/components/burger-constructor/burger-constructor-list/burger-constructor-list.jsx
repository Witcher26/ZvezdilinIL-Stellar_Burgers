import burgerConstructorList from "./burger-constructor-list.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import BurgerConstructorListItem from "./burger-constructor-list-item/burger-contructor-list-item";
import { SORT_INGREDIENTS_ON_DRAG } from "../../../services/actions/actions";

const BurgerConstructorList = ({ onDrop }) => {
    const [{ isOver }, dropRef] = useDrop({
        accept: ["main", "sauce"],
        drop(itemId) {
            onDrop(itemId);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const constructorIngredients = useSelector(store => store.ingredientsReducer.constructorIngredients);

    const dispatch = useDispatch();

    const moveIngredient = (dragIdx, hoverIdx) => {
        const dragIngredient = constructorIngredients[dragIdx];
        const newArr = [...constructorIngredients];
        newArr.splice(dragIdx, 1);
        newArr.splice(hoverIdx, 0, dragIngredient);
        dispatch({
            type: SORT_INGREDIENTS_ON_DRAG,
            payload: newArr,
        });
    };

    const elements = (
        <>
            {constructorIngredients.length ? (
                <ul
                    ref={dropRef}
                    className={`${burgerConstructorList.list}  custom-scroll ${
                        isOver ? burgerConstructorList.hovered_block : ""
                    }`}
                >
                    {constructorIngredients.map((item, index) => {
                        return (
                            <li key={item.key}>
                                <BurgerConstructorListItem
                                    moveIngredient={moveIngredient}
                                    item={item}
                                    index={index}
                                />
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <ul
                    className={`${burgerConstructorList.list} ${burgerConstructorList.list_empty}`}
                    ref={dropRef}
                >
                    <li
                        className={`${
                            burgerConstructorList.empty
                        } constructor-element mt-4 mr-2 ${
                            isOver ? burgerConstructorList.hovered_block : ""
                        }`}
                    >
                        Добавьте ингредиенты сюда
                    </li>
                </ul>
            )}
        </>
    );

    return elements;
};

BurgerConstructorList.propTypes = {
    onDrop: PropTypes.func.isRequired,
};

export default BurgerConstructorList;
