import React, { ReactNode } from 'react';
import './Modal.scss';

const Modal = (props: any) => {

    const findByKey = (name: string): ReactNode => {
        let expression = "";
        props.children.map((child: any) => {
            if (child.key === name) {
                expression = child;
            }
        })
        return expression;
    }

    const closeModal = (e: any) => {
        e.stopPropagation();

        if (e.target.classList.contains("modal-close")) {
            return props.click();
        }
    }

    return (
        <div className="modal-mask modal-close" onClick={closeModal}>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-header">
                        {findByKey("header")}
                    </div>
                    <div className="modal-body">
                        {findByKey("body")}
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close" onClick={closeModal}>CLOSE</button>
                        {findByKey("footer")}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;