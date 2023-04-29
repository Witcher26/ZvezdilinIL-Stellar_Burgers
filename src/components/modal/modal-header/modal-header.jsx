import React from "react";
import modalHeaderStyles from "./modal-header.module.css";
import PropTypes from "prop-types";

const ModalHeader = ({ children }) => {
    return <div className={modalHeaderStyles.header}>{children}</div>;
};

ModalHeader.propTypes = {
    children: PropTypes.node,
};

export default ModalHeader;
