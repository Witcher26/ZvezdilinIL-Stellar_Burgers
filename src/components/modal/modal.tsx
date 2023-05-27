import { useEffect } from "react";
import { createPortal } from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("root-modal") as HTMLElement;

type TModalProps = {
    className: string;
    children: JSX.Element;
    modalTitle?: string;
    handleCloseModal: () => void;
  };

const Modal = ({ modalTitle, className, children, handleCloseModal}: TModalProps): JSX.Element | null => {

    const handleOverlayClick = (e: React.SyntheticEvent) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        const onEscClick = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleCloseModal();
            }
        };
        
        document.addEventListener("keydown", onEscClick);

        return () => {
            document.removeEventListener("keydown", onEscClick);
        };
    }, [handleCloseModal]);

    return createPortal(
        <ModalOverlay handleCloseModal={handleOverlayClick}>
            <div className={`${modalStyles.modal} ${className}`}>
                <ModalHeader>
                    <>
                    {modalTitle && <h2 className="text text_type_main-large">
                        {modalTitle}
                    </h2>}
                    {/* <div className={modalStyles.close_pos}> */}
                        <button
                            className={modalStyles.close_btn}
                            onClick={handleCloseModal}
                        >
                            <CloseIcon type="primary"/>
                        </button>

                    {/* </div> */}
                    </>
                </ModalHeader>
                {children}
            </div>
        </ModalOverlay>,
        modalRoot
    );
};

export default Modal;
