import React from 'react';

const Modal = ({children}) => {

    //The children of this modal: ClientModal, ScreenerModal and more
    return (
        <div className="modal__container">
            {children}
        </div>
    )
}
export default Modal;
