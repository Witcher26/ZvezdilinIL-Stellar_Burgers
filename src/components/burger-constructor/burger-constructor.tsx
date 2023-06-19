import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import OrderingInfo from "./ordering-info/ordering-info";
import { useSelector } from "../hooks/hooks";

import burgerConstructor from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";

import {
    TConstructorIngredient,
    TDropType,
    TIngredient,
  } from "../../utils/types/types";

const BurgerConstructor = ({ onDrop }: TDropType): JSX.Element => {
    const constructorIngredients = useSelector(store => store.ingredientsReducer.constructorIngredients); //TODO сюда переместить handleCloseModal
    const bunData = useSelector(store => store.ingredientsReducer.bun);

    //TODO нет store.modalReducer.orderModal
    
    const bunsPrice = bunData ? bunData.price * 2 : 0;

    const finalPrice = constructorIngredients.reduce(
        (accum: number, item: TConstructorIngredient) => accum + item.price, 0
    ) + bunsPrice;

    const [{ isHover }, dropRef] = useDrop({
        accept: "bun",
        drop(item: TIngredient) {
            onDrop(item);
        },
        collect: (monitor) => ({
            isHover: monitor.isOver()
        }),
    });

    type TValue = "top" | "bottom";
    type TBunType = TIngredient | null;

    const renderBun = (bunData: TBunType, direction: string) => {
        const addValueFromDir = (
            direction: string,
            fstValue?: TValue,
            scndValue?: TValue,
        ) => {
            return direction === "верх" ? fstValue : scndValue;
        };

        const type = addValueFromDir(direction, "top", "bottom");
        if (bunData) {
            const {image, name, price} = bunData;
            return (
                <div className={
                    `${ isHover
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
            <div className={ `${ burgerConstructor.empty } constructor-element mr-2  ${ isHover
                ? `${burgerConstructor.hovered_block}`
                : "" } `}
            >
                Положите булку сюда
            </div>
        );
    };
    
    return (
        <div ref={dropRef} className="ml-20 mt-25">
            {renderBun(bunData, "верх")}
            <BurgerConstructorList onDrop={onDrop} />
            {renderBun(bunData, "низ")}
            <OrderingInfo finalPrice={finalPrice} />
        </div>
    );
};

export default BurgerConstructor;