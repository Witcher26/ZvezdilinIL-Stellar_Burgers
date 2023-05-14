import { useEffect } from "react";
import { createPortal } from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_INGREDIENT } from "../../services/actions/actions";
import { CLOSE_MODAL } from "../../services/actions/actions";

const modalRoot = document.getElementById("root-modal");

const Modal = ({ modalTitle, className, children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch({ type: CLOSE_MODAL });
        dispatch({ type: SET_ACTIVE_INGREDIENT, currentIngredient: {} });
        navigate("/", { replace: true });
    };

    const handleOverlayClick = e => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        const onEscClick = e => {
            if (e.key === "Escape") {
                handleCloseModal();
            }
        };
        
        document.addEventListener("keydown", onEscClick);

        return () => {
            document.removeEventListener("keydown", onEscClick);
        };
    }, []);

    return createPortal(
        <ModalOverlay handleCloseModal={handleOverlayClick}>
            <div className={`${modalStyles.modal} ${className}`}>
                <ModalHeader>
                    {modalTitle && 
                        <h2 className="text text_type_main-large">
                            {modalTitle}
                        </h2>
                    }
                    <button
                        className={modalStyles.close_btn}
                        onClick={handleCloseModal}
                    >
                        <CloseIcon />
                    </button>
                </ModalHeader>
                {children}
            </div>
        </ModalOverlay>,
        modalRoot
    );
};

Modal.propTypes = {
    /*
        Имя модального окна
    */
    modalTitle: PropTypes.string,
    /*
        внешний стиль
    */
    className: PropTypes.string,
    /*
        Содержимое модального окна
    */
    children: PropTypes.node,
};

export default Modal;
