import React, { Fragment, useState } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration.module.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { passwordReset } from "../../services/actions/formActions";
import { useDispatch } from "../../components/hooks/hooks";
import { baseUrl } from "../../env";
import { TFormValues } from "../../utils/types/types";

type TEmail = Pick<TFormValues, "email">;

export const ForgotPasswordPage = () => {
    const [formValues, setFormValues] = useState<TEmail>({ email: "" });

    const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormValues({ ...formValues, email: e.target.value });
    };
    const navigate = useNavigate();
    const location = useLocation();

    const _forgotPwdUrl = `${baseUrl}/password-reset`;

    const dispatch = useDispatch();

    const submitForm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(passwordReset(_forgotPwdUrl, formValues.email));
        navigate("/reset-password", { state: { from: location } });
    };

    return (
        <>
            <div className={styles.form_container}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <form action="#" onSubmit={submitForm} className={styles.form}>
                    <Input
                        type="email"
                        extraClass="mt-6"
                        placeholder="Укажите E-mail"
                        value={formValues.email}
                        onChange={changeInputValue}
                    />
                    <Button
                        extraClass="mt-6"
                        type="primary"
                        size="medium"
                        htmlType="submit"
                    >
                        Восстановить
                    </Button>
                </form>
                <div className={`${styles.form_info} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
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