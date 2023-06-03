import modalHeaderStyles from "./modal-header.module.css";

const ModalHeader = ({ children }: {children: JSX.Element}) => {
    return <div className={modalHeaderStyles.header}>
        {children}
    </div>;
};

export default ModalHeader;
