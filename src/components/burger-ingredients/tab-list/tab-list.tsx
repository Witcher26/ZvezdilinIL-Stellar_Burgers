import { forwardRef } from "react";
import styles from "./styles.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector } from "react-redux";

type TRef = HTMLDivElement | null;
type TFunc = { scrollByTabClick: (type: string) => void };

const TabList = forwardRef<TRef, TFunc>(function TabList({ scrollByTabClick }, ref) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const current = useSelector(store => store.ingredientsReducer.currentTab);

    const handleClick = (element: string) => {scrollByTabClick(element)};

    return (
        <div className={`${styles.tab_list}`} ref={ref}>
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