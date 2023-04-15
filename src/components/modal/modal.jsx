import {useEffect} from "react";
import { createPortal } from "react-dom";
import ModalHeader from "./modal-header";
import ModalOverlay from "./modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import modal from "./modal.module.css"

const modalRoot = document.getElementById("root-modal");

const Modal = ({modalTitle, closeModal, children}) => {
    const handleCloseModal = () => {
        closeModal(false);
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
            <div className={modal.modal}>
                <ModalHeader>
                    {modalTitle && (
                        <h2 className="text_type_main-large">
                            {modalTitle}
                        </h2>
                    )}
                    <button
                        className={modal.button_close}
                        onClick={handleCloseModal}
                    >
                        <CloseIcon/>
                    </button>
                </ModalHeader>
                {children}
            </div>
        </ModalOverlay>, modalRoot
    );
};

Modal.propTypes = {
    /*
        Название ингредиента
    */
    modalTitle: PropTypes.string,
    /*
        Функция закрытия модального окна
    */
    closeModal: PropTypes.func.isRequired,
    /*
        Составляющая модального окна
    */
    children: PropTypes.node,
};

export default Modal;