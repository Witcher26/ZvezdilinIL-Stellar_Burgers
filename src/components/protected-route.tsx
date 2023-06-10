import { useSelector } from "./hooks/hooks";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./protected-route.module.css"
import { Loader } from "./loader/loader";

type TProtectedRoute = {
    unAuthorized: boolean;
    component: JSX.Element;
  };

export const ProtectedRoute = ({ unAuthorized = false, component }: TProtectedRoute) => {
    const user = useSelector(store => store.formReducer.userInfo);
    const location = useLocation();

    if (user && unAuthorized) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }
    if (!user && !unAuthorized) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
};

type TProtectedProps = Pick<TProtectedRoute, "component">;

export const Authorized = ({component}: TProtectedProps) => (
    <ProtectedRoute unAuthorized={false} component={component} />
);

export const UnAuthorized = ({component}: TProtectedProps) => {
    return <ProtectedRoute unAuthorized={true} component={component} />;
};