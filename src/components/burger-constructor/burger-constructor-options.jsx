import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import burgeConstructor from "./burger-constructor.module.css"

const BurgerConstructorOptions = ({data}) => {
    const items = data.map(({ _id, name, price, image}) => {
        return (
            <li className={burgeConstructor.elements_position_burger} key={_id}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                        text={name}
                        price={price}
                        thumbnail={image}
                    />
            </li>
        );
    });

    return (
        <ul className={`${burgeConstructor.elements_position} custom-scroll`}>
            {items}
        </ul>
    );
}

BurgerConstructorOptions.propTypes = {
    /*
        Массив с ингредиентами
    */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export {BurgerConstructorOptions};