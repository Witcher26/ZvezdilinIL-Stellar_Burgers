import appHeader from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink } from "react-router-dom";

const AppHeader = () => {

    return (
        <header className={appHeader.header}>
            <div className={`${appHeader.text_color} ml-2 pb-4 pt-4 pl-5 pr-5 text text_type_main-default`}>
                <NavLink to="/">
                    <BurgerIcon type="secondary"/>
                        Конструктор
                </NavLink>
                <NavLink to="/profile/orders" >
                    <div className={`${appHeader.text_color} ml-2 pb-4 pt-4 pl-5 pr-5 text text_type_main-default`}>
                        <ListIcon type="secondary"/>
                            Лента заказов
                    </div>
                </NavLink>
                <div className={appHeader.logo}>
                    <Logo/>
                </div>
                <NavLink to="/profile">
                    <div className={`${appHeader.text_color} pb-4 pt-4 pl-5 pr-5 text text_type_main-default`}>
                        <ProfileIcon type="secondary"/>
                            Личный кабинет

                    </div>
                </NavLink>
            </div>
        </header>
    );
};

export default AppHeader;
