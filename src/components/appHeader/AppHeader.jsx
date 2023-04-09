import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./styles.css";

export default function AppHeader() {
    return (
        <header className="header">
            <p className="icon burgerIcon">
                <BurgerIcon type="secondary"/>
                    <span className="text textCenterCustom">
                        Конструктор
                    </span>
            </p>
            <p className="icon listIcon">
                <ListIcon type="secondary"/>
                    <span className="text textCenterCustom">
                        Лента заказов
                    </span>
            </p>
            <p className="logo">
                <Logo/>
            </p>
            <p className="icon profileIcon">
                <ProfileIcon type="secondary"/>
                    <span className="text">
                        Личный кабинет
                    </span>
            </p>
        </header>
    );
}
