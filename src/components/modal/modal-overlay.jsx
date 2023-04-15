import PropTypes from "prop-types";
import modal from "./modal.module.css"

const ModalOverlay = ({ handleCloseModal, children }) => {
    return (
        <div
            className={modal.overlay}
            onClick={handleCloseModal}
            aria-hidden="true"
        >
            {children}
        </div>
    );
};

ModalOverlay.propTypes = {
    /*
        Функция закрытия модального окна
    */
    handleCloseModal: PropTypes.func.isRequired,
    /*
        Составляющая модального окна
    */
    children: PropTypes.node,
};

export default ModalOverlay;