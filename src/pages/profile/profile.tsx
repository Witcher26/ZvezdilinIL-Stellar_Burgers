import React, { useState } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";
import { useDispatch, useSelector } from "../../components/hooks/hooks";
import { updateUserData } from "../../services/actions/formActions";
import { baseUrl } from "../../env";
import NavigationMenu from "../../components/navigation-menu/navigation-menu";
import { TFormValues } from "../../utils/types/types";

export const ProfilePage = () => {
    const user = useSelector(store => store.formReducer.userInfo);
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState<TFormValues>({
        name: user ? user.name : "",
        email: user ? user.email : "",
        password: "",
    });

    const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = e => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const _updateUserUrl = `${baseUrl}/auth/user`;

    const changeUserData = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateUserData(_updateUserUrl, formValues));
    };

    const handleReset = () => {
        if (user) {
            setFormValues({
                ...formValues,
                name: user.name,
                email: user.email,
                password: user.password
            });

        }
    };

    return (
        <>
            <div className={styles.container}>
                <NavigationMenu
                    desc="В этом разделе вы можете изменить свои персональные
                        данные"
                />
                <form onSubmit={changeUserData} className={styles.user_info}>
                    <Input
                        type="text"
                        name="name"
                        extraClass="mb-6"
                        placeholder="Имя"
                        icon={"EditIcon"}
                        value={formValues.name}
                        onChange={changeInputValue}
                    />
                    <Input
                        type="email"
                        name="email"
                        extraClass="mb-6"
                        placeholder="E-mail"
                        icon={"EditIcon"}
                        value={formValues.email}
                        onChange={changeInputValue}
                    />
                    <Input
                        type="password"
                        icon={"EditIcon"}
                        placeholder="Пароль"
                        name="password"
                        value={formValues.password || ""}
                        // value="******"
                        // value={formValues.password} //TODO 
                        extraClass="mb-6"
                        onChange={changeInputValue}
                    />
                    <div className={styles.buttons}>
                        {user && (formValues.name !== user.name ||
                            formValues.password !== user.password ||
                                formValues.email !== user.email) && (
                                    
                                    <>
                                        <Button
                                            htmlType="button"
                                            type="secondary"
                                            size="medium"
                                            onClick={handleReset}
                                        >
                                            Отмена
                                        </Button>
                                        <Button
                                            htmlType="submit"
                                            type="primary"
                                            size="medium"
                                        >
                                            Сохранить
                                        </Button>
                                    </>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};