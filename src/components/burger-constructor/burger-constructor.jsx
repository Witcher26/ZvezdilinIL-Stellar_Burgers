import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import OrderingInfo from "./ordering-info/ordering-info";
import { useSelector } from "react-redux";

import burgerConstructor from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

const BurgerConstructor = ({ onDrop }) => {
    const constructorIngredients = useSelector(store => store.ingredientsReducer.constructorIngredients);
    const bunData = useSelector(store => store.ingredientsReducer.bun);
    
    const bunsPrice = bunData ? bunData.price * 2 : 0;
    const finalPrice = constructorIngredients.reduce((accum, item) => accum + item.price, 0) + bunsPrice;

    const { image, name, price } = bunData || {};

    const [{ isOverTop }, dropRefTop] = useDrop({
        accept: "bun",
        drop(item) {
            onDrop(item);
        },
        collect: (monitor) => ({
            isOverTop: monitor.isOver(),
        }),
    });

    const [{ isOverBottom }, dropRefBottom] = useDrop({
        accept: "bun",
        drop(itemId) {
            onDrop(itemId);
        },
        collect: (monitor) => ({
            isOverBottom: monitor.isOver(),
        }),
    });

    const renderBun = (bunData, direction) => {
        const addValueFromDir = (direction, fstValue, scndValue) => {
            return direction === "верх" ? fstValue : scndValue;
        };

        const overDirection = addValueFromDir(
            direction,
            isOverTop,
            isOverBottom
        );

        const ref = addValueFromDir(direction, dropRefTop, dropRefBottom);
        const type = addValueFromDir(direction, "top", "bottom");
        if (bunData) {
            return (
                <div
                    ref={ref}
                    className={`${
                        overDirection
                            ? `${burgerConstructor.hovered_block} ${burgerConstructor.bun_container}`
                            : ""
                    } `}
                >
                    <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={`${name} (${direction})`}
                        price={price}
                        thumbnail={image}
                        extraClass="ml-2"
                    />
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={`${
                    burgerConstructor.empty
                } constructor-element mr-2  ${
                    overDirection ? `${burgerConstructor.hovered_block}` : ""
                } `}
            >
                Положите булку сюда
            </div>
        );
    };
    return (
        <div className="ml-20 mt-25">
            {renderBun(bunData, "верх")}
            <BurgerConstructorList onDrop={onDrop} />
            {renderBun(bunData, "низ")}
            <OrderingInfo finalPrice={finalPrice} />
        </div>
    );
};

BurgerConstructor.propTypes = {
    onDrop: PropTypes.func.isRequired,
};

export default BurgerConstructor;