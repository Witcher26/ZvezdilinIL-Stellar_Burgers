import PropTypes from "prop-types";
import ingredientDetails from "./burger-ingredients.module.css"
import { useSelector } from "react-redux";

function IngredientDetails() {
    const currentIngredient = useSelector((store) => store.currentIngredient);
    const generateMarkup = element => {
        const {
            image_large,
            name,
            calories,
            carbohydrates,
            proteins,
            fat
        } = element;

        return (
            <div>
                <img className={ingredientDetails.image_position} src={image_large} alt={name}/>
                <h3 className={ingredientDetails.igredient_name}>{name}</h3>
                <div className={ingredientDetails.propertyes}>
                    <ul className={`${ingredientDetails.text_position} ${ingredientDetails.list_style_type_none}`}>
                        <li className="mr-5">
                            <p className="text text_type_main-default text_color_inactive">
                                Калории,ккал
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {calories}
                            </p>
                        </li>
                        <li className="mr-5">
                            <p className="text text_type_main-default text_color_inactive">
                                Белки, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {proteins}
                            </p>
                        </li>
                        <li className="mr-5">
                            <p className="text text_type_main-default text_color_inactive">
                                Жиры, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {fat}
                            </p>
                        </li>
                        <li className="mr-5">
                            <p className="text text_type_main-default text_color_inactive">
                                Углеводы, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {carbohydrates}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    const modalBody = generateMarkup(currentIngredient);

    return modalBody;
}

IngredientDetails.propTypes = {
    /*
        Набор свойств ингредиента
    */
        currentIngredient: PropTypes.object,
};

export default IngredientDetails;