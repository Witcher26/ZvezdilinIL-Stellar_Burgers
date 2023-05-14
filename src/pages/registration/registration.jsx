import React, { Fragment, useState } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";
import AppHeader from "../../components/app-header/app-header";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/actions/formActions";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../env";

export const RegisterPage = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        password: "",
        email: "",
    });

    const navigate = useNavigate();

    const changeInputValue = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const _registerUrl = `${baseUrl}/auth/register`;

    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(registerUser(_registerUrl, formValues));
        navigate("/", {
            replace: true,
        });
    };

    return (
        <>
            <AppHeader />
            <div className={styles.form_container}>
                <h1 className="text text_type_main-medium">Регистрация</h1>
                <form onSubmit={submitForm} action="" className={styles.form}>
                    <Input
                        name="name"
                        type="text"
                        extraClass="mt-6"
                        placeholder="Имя"
                        value={formValues.name}
                        onChange={changeInputValue}
                    />
                    <Input
                        name="email"
                        type="email"
                        extraClass="mt-6"
                        placeholder="E-mail"
                        value={formValues.email}
                        onChange={changeInputValue}
                    />
                    <Input
                        name="password"
                        type="password"
                        icon={"ShowIcon"}
                        placeholder="Пароль"
                        extraClass="mt-6"
                        value={formValues.password}
                        onChange={changeInputValue}
                    />
                    <Button
                        extraClass="mt-6"
                        htmlType="submit"
                        type="primary"
                        size="medium"
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={`${styles.form_info} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
                    </p>
                    <Link
                        className={`${styles.form_info_link} text text_type_main-default ml-2`}
                        to="/login"
                    >
                        Войти
                    </Link>
                </div>
            </div>
        </>
    );
};