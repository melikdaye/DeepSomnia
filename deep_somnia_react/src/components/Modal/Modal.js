import React, {useEffect} from "react";
import ReactPortal from "./ReactPortal";
import styles from "./modalStyle";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {AddBoxRounded} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(styles);

function Modal({ children, isOpen, handleClose }) {
    const style = useStyles()
    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    if (!isOpen) return null;
    return (
        <ReactPortal wrapperId="react-portal-modal-container">
        <div className={style.modalBody}>
            <IconButton onClick={handleClose} className={style.closeButton}>
                <CloseIcon/>
            </IconButton>
            <div className={style.modal_content}>{children}</div>
        </div>
        </ReactPortal>
    );
}
export default Modal;