import React from 'react';
import './DeleteModal.css';
const DeleteModal = ({deleteInfo, content, cancel, confirm = "Delete"}) => {
    return (
        <div className="delete__modal modal__animation">
            <div className="modal__content">
                <h4>{content}</h4>
            </div>
            <div className="modal__controls">
                <button className="cancel__delete" onClick={cancel}>Cancel</button>
                <button className="delete__item" onClick={deleteInfo}>{ confirm }</button>
            </div>
        </div>
    )
}

export default DeleteModal;
