import PropTypes from "prop-types";
import modal from "./modal.module.css"

const ModalHeader = ({children}) => {
    return <div className={modal.modalHeader}>
                {children}
            </div>
};

ModalHeader.propTypes = {
    /*
        Составляющая модального окна
    */
    children: PropTypes.node,
};

export default ModalHeader;