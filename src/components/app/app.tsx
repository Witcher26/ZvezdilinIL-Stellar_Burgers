import React from 'react';
import { useDispatch, useSelector } from '../hooks/hooks';
import { getIngredients } from '../../services/actions/ingredientsActions';
import { CLOSE_MODAL } from '../../services/constants';
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
import { FeedPage } from '../../pages/feed';
import { OrderCardPage } from '../../pages/order-card-page';
import { BurgerCardExpanded } from '../burger-order-list/burger-order-expanded/burger-order-expanded';

const ingredientsUrl = `${baseUrl}/ingredients`;

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dispatchModal = useDispatch();
    const user = useSelector(store => store.formReducer.userInfo);

    React.useEffect(() => {
        dispatch(getIngredients(ingredientsUrl));
        if (user) {
            dispatch(checkUserAuth());
        }
    }, []);

    const location = useLocation();
    const background = location.state && location.state.background;

    const handleCloseModal = () => {
        navigate(-1);
        dispatchModal({ type: CLOSE_MODAL });
    }

    const cardModal = useSelector(store => store.modalReducer.cardModal);
    const currentFeedOrder = useSelector(store => store.feedReducer.currentOrder);
    const cardOrderModal = useSelector(store => store.modalReducer.cardOrderModal);
    const currentOrder = useSelector(store => store.feedOrderReducer.currentOrder);

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
                <Route path="/profile/orders/:id" element={<Authorized component={<OrderCardPage />} />}/>
                <Route path="/ingredients/:ingredientId" element={<IngredientDetails />}/>
                <Route path="*" element={<NotFoundPage />}/>
                <Route path="/feed" element={<FeedPage />}/>
                <Route path="/feed/:id" element={<OrderCardPage/>}/>
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
                    <Route
                        path="/feed/:id"
                        element={
                            cardModal && (
                                <Modal
                                    handleCloseModal={handleCloseModal}
                                    className="pt-10 pl-10 pb-15 pr-10"
                                >
                                    <BurgerCardExpanded order={currentFeedOrder}/>
                                </Modal>
                            )
                        }
                    />
                    <Route
                        path="/profile/orders/:id"
                        element={
                            cardOrderModal && (
                                <Modal
                                    handleCloseModal={handleCloseModal}
                                    className="pt-10 pl-10 pb-15 pr-10"
                                >
                                    <Authorized component={<BurgerCardExpanded order={currentOrder} />}/>
                                </Modal>
                            )
                        }
                    />
                </Routes>
            )}
        </React.Fragment>
    );
}

export default App;