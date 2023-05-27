import styles from "./navigation-menu.module.css";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOut } from "../../services/actions/formActions";
import { baseUrl } from "../../env";

const NavigationMenu = ({ desc }: {desc: string}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const _logOutUrl = `${baseUrl}/auth/logout`;

    const signOut = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(logOut(_logOutUrl));
        navigate("/login", { replace: true });
    };

    const linkActiveClass = `${styles.active} ${styles.nav_link}  text text_type_main-medium`;
    const linkClass = `${styles.nav_link} text text_type_main-medium`;

    return (
        <div className={styles.container}>
            <div className={`${styles.nav_container}  mr-15`}>
                <nav className={styles.main_container}>
                    <ul className={styles.list}>
                        <li className="pb-5 pt-5">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? `${linkActiveClass}`
                                        : `${linkClass}`
                                }
                                to="/profile"
                                end
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li className="pb-5 pt-5">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? `${linkActiveClass}`
                                        : `${linkClass}`
                                }
                                to="/profile/orders"
                            >
                                История заказов
                            </NavLink>
                        </li>
                        <li className="pb-5 pt-5">
                            <button
                                className={`${styles.logout_btn} text text_type_main-medium`}
                                onClick={signOut}
                            >
                                Выход
                            </button>
                        </li>
                    </ul>
                </nav>
                <p className="mt-20 text text_type_main-default text_color_inactive">
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default NavigationMenu;