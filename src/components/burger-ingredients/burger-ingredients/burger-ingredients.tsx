import React from "react";
import burgerIngredients from "./burger-ingredients.module.css"
import IngredientsOptions from "../ingredients-options";

import { useDispatch } from "../../hooks/hooks";
import { SET_CURRENT_TAB } from "../../../services/constants";
import TabList from "../tab-list/tab-list";

type TIngredientOpts = {
    type: string;
    ref: React.RefObject<HTMLDivElement | null>;
};

const BurgerIngredients = () => {
    const listRef = React.useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();

    const tabRef = React.useRef<HTMLDivElement | null>(null);
    const bunOptions = { type: "bun", ref: React.useRef<HTMLDivElement | null>(null) };
    const sauceOptions = { type: "sauce", ref: React.useRef<HTMLDivElement | null>(null) };
    const mainOptions = { type: "main", ref: React.useRef<HTMLDivElement | null>(null) };

    const setCurrentElement = (tabPos: number, element: TIngredientOpts) => {
        const {
            ref: { current },
            type,
        } = element;

        if (!current) {
            return;
        }

        if (tabPos - current.getBoundingClientRect().top >= 0) {
            dispatch({ type: SET_CURRENT_TAB, payload: type });
        }
    };

    const findScrollableEl = (obj: TIngredientOpts, type: string) => {
        if (obj.type === type) {
            if (!obj.ref.current) {
                return;
            }

            obj.ref.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const scrollByTabClick = (type: string) => {
        findScrollableEl(bunOptions, type);
        findScrollableEl(sauceOptions, type);
        findScrollableEl(mainOptions, type);
    };

    React.useEffect(() => {
        const handleScroll = () => {
            if (!tabRef.current) {
                return;
            }
            const tabsBottomPos = tabRef.current.getBoundingClientRect().bottom;
            setCurrentElement(tabsBottomPos, bunOptions);
            setCurrentElement(tabsBottomPos, sauceOptions);
            setCurrentElement(tabsBottomPos, mainOptions);
        };
        const listNode = listRef.current;
        if (!listNode) {
            return;
        }
        listNode.addEventListener("scroll", handleScroll);

        return () => {
            listNode.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const buildListLayout = (obj: TIngredientOpts): JSX.Element => {
        const { type, ref } = obj;
        return <IngredientsOptions ingredientsType={type} ref={ref} />;
    };
    
    return (
        <div className={burgerIngredients.burger_box}>
            <h2 className="text text_type_main-large mt-10 mb-5" data-cy="constructor title">
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