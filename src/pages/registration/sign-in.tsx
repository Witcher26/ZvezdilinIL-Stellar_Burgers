import React, { useState } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/actions/formActions";
import { baseUrl } from "../../env";
import { TFormValues } from "../../utils/types/types";

type TSingInForm = Omit<TFormValues, "name">;

export const SignInPage = () => {
    const [formValues, setFormValues] = useState<TSingInForm>({
        email: "",
        password: "",
    });

    const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = e => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const _loginUrl = `${baseUrl}/auth/login`;

    const dispatch = useDispatch();

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(loginUser(_loginUrl, formValues));
    };

    const { email, password } = formValues;
    return (
        <>
            <div className={styles.form_container}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <form action="" className={styles.form} onSubmit={submitForm}>
                    <Input
                        type="email"
                        name="email"
                        extraClass="mt-6"
                        placeholder="E-mail"
                        value={email}
                        onChange={changeInputValue}
                    />
                    <Input
                        type="password"
                        name="password"
                        icon={"ShowIcon"}
                        placeholder="Пароль"
                        extraClass="mt-6"
                        value={password}
                        onChange={changeInputValue}
                    />
                    <Button
                        extraClass="mt-6"
                        htmlType="submit"
                        type="primary"
                        size="medium"
                    >
                        Войти
                    </Button>
                </form>
                <div className={`${styles.form_info} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                    </p>
                    <Link
                        className={`${styles.form_info_link} text text_type_main-default ml-2`}
                        to="/register"
                    >
                        Зарегистрироваться
                    </Link>
                </div>
                <div className={`${styles.form_info} mt-4`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                    </p>
                    <Link
                        className={`${styles.form_info_link} text text_type_main-default ml-2`}
                        to="/forgot-password"
                    >
                        Восстановить пароль
                    </Link>
                </div>
            </div>
        </>
    );
};