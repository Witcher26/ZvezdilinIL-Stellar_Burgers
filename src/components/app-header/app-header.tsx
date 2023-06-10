import appHeader from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink } from "react-router-dom";

const AppHeader = () => {
    const linkActiveClass = `${appHeader.link_active} ${appHeader.link} ml pb-4 pt-4 pl-5 pr-5 text text_type_main-default`;
    const linkClass = ` ${appHeader.link} ml pb-4 pt-4 pl-5 pr-5 text text_type_main-default`;

    return (
        <header className={appHeader.header}>
            <nav className={appHeader.nav}>
                <NavLink to="/" className={({ isActive }) => isActive ? `${linkActiveClass}` : `${linkClass}`}>
                    <BurgerIcon type="secondary"/>
                    <span className="ml-2">Конструктор</span>
                </NavLink>
                <NavLink to="/feed" className={({ isActive }) => isActive ? `${linkActiveClass}` : `${linkClass}`}>
                    <ListIcon type="secondary"/>
                    <span className="ml-2">Лента заказов</span>
                </NavLink>
                <NavLink to="/" className={appHeader.logo}>
                    <Logo />
                </NavLink>
                <NavLink to="/profile" end className={({ isActive }) => isActive ? `${linkActiveClass}` : `${linkClass}`}>
                    <ProfileIcon type="secondary"/>
                    <span className="ml-2">Личный кабинет</span>
                </NavLink>
            </nav>
        </header>
    );
};

export default AppHeader;