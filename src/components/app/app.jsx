import React from 'react';
import { useDispatch } from "react-redux";
import { getIngredients } from '../../services/actions/actions';
import { baseUrl } from '../../env';
import { Routes, Route, useLocation } from 'react-router-dom';

import ConstructorPage from '../../pages/constructor-page/constructor-page';
import { UnAuthorized, Authorized } from '../protected-route';
import { SignInPage } from '../../pages/registration/sign-in';
import { RegisterPage } from '../../pages/registration/registration';
import { ForgotPasswordPage } from '../../pages/registration/forgot-password';
import { ResetPasswordPage } from '../../pages/registration/reset-password';
import { ProfilePage } from '../../pages/profile';
import { OrderPage } from '../../pages/orders';
import IngredientDetails from '../burger-ingredients/ingredient-details';
import { NotFoundPage } from '../../pages/not-found-page';
import Modal from '../modal/modal';
import { checkUserAuth } from '../../services/actions/formActions';

const ingredientsUrl = `${baseUrl}/ingredients`;

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getIngredients(ingredientsUrl));
        dispatch(checkUserAuth());
    }, [dispatch]);

    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <React.Fragment>
            <Routes location={background || location}>
                <Route path="/" element={<ConstructorPage />} />
                <Route path="/login" element={<UnAuthorized component={<SignInPage />} />}/>
                <Route path="/register" element={<UnAuthorized component={<RegisterPage />} />}/>
                <Route path="/forgot-password" element={<UnAuthorized component={<ForgotPasswordPage />} />}/>
                <Route path="/reset-password" element={<UnAuthorized component={<ResetPasswordPage />} />} />
                <Route path="/profile" element={<Authorized component={<ProfilePage />} />}/>
                <Route path="/profile/orders" element={<Authorized component={<OrderPage />} />} />
                <Route path="/ingredients/:ingredientId" element={<IngredientDetails />}/>
                <Route path="*" element={<NotFoundPage />}/>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:ingredientId"
                        element={
                            <Modal
                                modalTitle="Детали ингредиента"
                                className="pt-10 pl-10 pb-15 pr-10"
                            >
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </React.Fragment>
    );
}

export default App;