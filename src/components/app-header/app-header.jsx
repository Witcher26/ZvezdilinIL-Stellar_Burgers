import appHeader from "./app-header.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
    return (
        <header className={appHeader.header}>
            <div className={`${appHeader.text_color} ml-2 pb-4 pt-4 pl-5 pr-5 text text_type_main-default`}>
                    <BurgerIcon type="secondary"/>
                        Конструктор
                <div className={`${appHeader.text_color} ml-2 pb-4 pt-4 pl-5 pr-5 text text_type_main-default`}>
                    <ListIcon type="secondary"/>
                        Лента заказов
                </div>
                <div className={appHeader.logo}>
                    <Logo/>
                </div>
                <div className={`${appHeader.text_color} pb-4 pt-4 pl-5 pr-5 text text_type_main-default`}>
                    <ProfileIcon type="secondary"/>
                        Личный кабинет
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
