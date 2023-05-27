import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgeConstructor from "./burger-constructor.module.css"
import { TIngredient } from "../../utils/types/types";

type TDataProps = {
    data: Array<TIngredient>
  };

const BurgerConstructorOptions = ({data}: TDataProps) => {
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

export {BurgerConstructorOptions};