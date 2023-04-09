import React from "react";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import "./styles.css";

const BurgerConstructorOptions = ({data}) => {
    const items = data.map(({ _id, name, price, image }) => {
        return (
            <>
                <div className="custom-scroll">
                    <li key={_id}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={name}
                            price={price}
                            thumbnail={image}
                        />
                    </li>
                </div>
            </>
        );
    });

    return (
        <>
            <ul className="elements_position custom-scroll">
                {items}
            </ul>

        </>
    );
}

BurgerConstructorOptions.propTypes = {
    /*
        Массив с ингредиентами
    */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default BurgerConstructorOptions;