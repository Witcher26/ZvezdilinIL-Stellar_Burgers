import React from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../data/data";
import BurgerConstructorOptions from './BurgerConstructorOptions';
import Order from "./Order";

const BurgerConstructor = () => {
    const bunData = data.find(item => item.type === "bun");
    const notBunData = data.filter(item => item.type !== "bun");
    let totalPrice = 0;

    notBunData.forEach(element => {
        return totalPrice = totalPrice + element.price
    })

    return (
        <div className="flex">
            <div className="burger-box">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bunData.name} (верхняя булка)`}
                    price={bunData.price}
                    thumbnail={bunData.image}
                />

                <BurgerConstructorOptions data={data}/>

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bunData.name} (нижняя булка)`}
                    price={bunData.price}
                    thumbnail={bunData.image}
                />
                <div>
                    <Order finalPrice={totalPrice}/>
                </div>
            </div>
        </div>
    );
};

export default BurgerConstructor;