import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, CLOSE_MODAL  } from '../../services/actions/actions';
import { baseUrl } from '../../env';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';

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
import AppHeader from '../app-header';

const ingredientsUrl = `${baseUrl}/ingredients`;

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dispatchModal = useDispatch();

    const user = useSelector(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        store => store.formReducer.userInfo
    );

    React.useEffect(() => {
        dispatch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getIngredients(ingredientsUrl));

        if (user) {
            dispatch(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
            checkUserAuth());
        }
    }, [dispatch, user]);

    const location = useLocation();
    const background = location.state && location.state.background;

    const handleCloseModal = () => {
        navigate(-1);
        dispatchModal({ type: CLOSE_MODAL });
    }

    return (
        <React.Fragment>
            <AppHeader/>
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
                                handleCloseModal={handleCloseModal}
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