import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ unAuthorized = false, component }) => {
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

export const Authorized = (props) => (
    <ProtectedRoute unAuthorized={false} {...props} />
);

export const UnAuthorized = (props) => {
    return <ProtectedRoute unAuthorized={true} {...props} />;
};

ProtectedRoute.propTypes = {
    unAuthorized: PropTypes.bool,
    component: PropTypes.node,
};