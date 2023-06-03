import modalOverlayStyles from "./modal-overlay.module.css";

type TModalOverlay = {
    handleCloseModal: (e: React.SyntheticEvent) => void;
    children: JSX.Element;
};

const ModalOverlay = ({ handleCloseModal, children }: TModalOverlay) => {
    return (
        <div
            className={modalOverlayStyles.overlay}
            onClick={handleCloseModal}
            aria-hidden="true"
        >
            {children}
        </div>
    );
};

export default ModalOverlay;
