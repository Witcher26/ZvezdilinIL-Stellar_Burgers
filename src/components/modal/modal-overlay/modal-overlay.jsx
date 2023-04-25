import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ handleCloseModal, children }) => {
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

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default ModalOverlay;
