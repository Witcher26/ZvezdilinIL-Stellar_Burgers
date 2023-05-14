import React from "react";
import burgerIngredients from "./burger-ingredients.module.css"
import IngredientsOptions from "../ingredients-options.jsx";

import { useDispatch } from "react-redux";
import { SET_CURRENT_TAB } from "../../../services/actions/actions.js";
import TabList from "../tab-list/tab-list.jsx";

const BurgerIngredients = () => {
    const listRef = React.useRef(null);
    const dispatch = useDispatch();

    const tabRef = React.useRef(null);
    const bunOptions = { type: "bun", ref: React.useRef(null) };
    const sauceOptions = { type: "sauce", ref: React.useRef(null) };
    const mainOptions = { type: "main", ref: React.useRef(null) };

    const setCurrentElement = (tabPos, element) => {
        const {
            ref: { current },
            type,
        } = element;

        if (tabPos - current.getBoundingClientRect().top >= 0) {
            dispatch({ type: SET_CURRENT_TAB, payload: type });
        }
    };

    const findScrollableEl = (obj, type) => {
        if (obj.type === type) {
            obj.ref.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const scrollByTabClick = (type) => {
        findScrollableEl(bunOptions, type);
        findScrollableEl(sauceOptions, type);
        findScrollableEl(mainOptions, type);
    };

    React.useEffect(() => {
        const handleScroll = () => {
            const tabsBottomPos = tabRef.current.getBoundingClientRect().bottom;
            setCurrentElement(tabsBottomPos, bunOptions);
            setCurrentElement(tabsBottomPos, sauceOptions);
            setCurrentElement(tabsBottomPos, mainOptions);
        };
        const listNode = listRef.current;
        listNode.addEventListener("scroll", handleScroll);

        return () => {
            listNode.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const buildListLayout = (obj) => {
        const { type, ref } = obj;
        return <IngredientsOptions ingredientsType={type} ref={ref} />;
    };
    
    return (
        <div className={burgerIngredients.burger_box}>
            <h2 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h2>
            <TabList scrollByTabClick={scrollByTabClick} ref={tabRef} />
            <div className={`${burgerIngredients.burger_text_position} custom-scroll`} ref={listRef}>
                {buildListLayout(bunOptions)}
                {buildListLayout(sauceOptions)}
                {buildListLayout(mainOptions)}
            </div>
        </div>
    );
};

export default BurgerIngredients;