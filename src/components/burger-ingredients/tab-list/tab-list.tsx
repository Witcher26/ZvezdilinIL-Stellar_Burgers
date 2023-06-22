import { forwardRef } from "react";
import styles from "./styles.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector } from "../../hooks/hooks";

type TRef = HTMLDivElement | null;
type TFunc = { scrollByTabClick: (type: string) => void };

const TabList = forwardRef<TRef, TFunc>(function TabList({ scrollByTabClick }, ref) {

    const current = useSelector(store => store.ingredientsReducer.currentTab);
    const handleClick = (element: string) => {scrollByTabClick(element)};

    return (
        <div className={`${styles.tab_list}`} ref={ref} data-cy="bulk-id">
            <Tab value="bun" active={current === "bun"} onClick={handleClick}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === "sauce"} onClick={handleClick}>
                Соусы
            </Tab>
            <Tab value="main" active={current === "main"} onClick={handleClick}>
                Начинки
            </Tab>
        </div>
    );
});

export default TabList;