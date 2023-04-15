import IngredientItem from "./ingredient-item";
import ingredientDetails from "./burger-ingredients.module.css"
import PropTypes from "prop-types";

const IngredientsOptions = ({currentIngredient, data, openModal, getActiveIngredient}) => {
    
    const ingredientOptions = data.filter(item => item.type === currentIngredient);
    const handleClick = (item) => {
        getActiveIngredient(item);
        openModal(true, "ingredients");
    };

    return (
        <ul id="dispaly_inline" className={ingredientDetails.dispaly_grid}>
            {ingredientOptions.map((item, index) => {
                return (
                    <li className={`${ingredientDetails.list} custom-scroll`}
                        key={index}
                        onClick={() => handleClick(item)}
                        aria-hidden="true"
                    >
                        <IngredientItem item={item}/>
                    </li> 
            )})}
        </ul>
)}

IngredientsOptions.propTypes = {
    /*
        Выбранный ингредиент на главной панели: булки, соусы или начинки
    */
    currentIngredient: PropTypes.string.isRequired,
    /*
        Массив с ингредиентами
    */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    /*
       Функция вызова модального окна
    */
    openModal: PropTypes.func.isRequired
};

export default IngredientsOptions