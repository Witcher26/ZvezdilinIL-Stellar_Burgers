import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {BurgerConstructorOptions} from './burger-constructor-options.jsx'
import {Order} from "./order.jsx";
import burgerConstructor from "./burger-constructor.module.css"

const BurgerConstructor = ({data, openModal}) => {
    const bunElement = data.find(item => item.type === "bun");
    const innerBurgerContent = data.filter(item => item.type !== "bun");

    const totalPrice = data.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="flex">
            <div className={burgerConstructor.burger_box}>
                <div className={burgerConstructor.top}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bunElement.name} верхняя булка`}
                    price={bunElement.price}
                    thumbnail={bunElement.image}/>
                </div>

                <BurgerConstructorOptions data={innerBurgerContent}/>

                <div className={burgerConstructor.top}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bunElement.name} нижняя булка`}
                    price={bunElement.price}
                    thumbnail={bunElement.image}/>
                </div>
                <div>
                    <Order finalPrice={totalPrice} openModal={openModal}/>
                </div>
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    /*
        Массив с ингредиентами
    */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    /*
       Функция вызова модального окна
    */
    openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;