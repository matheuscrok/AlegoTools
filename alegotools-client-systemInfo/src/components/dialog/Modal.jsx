import './modal.scss'
import React from 'react'
import ReactDom from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ children, show, closeFn }) => {
  if (!show) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay" onClick={closeFn}/>
      <div className="modal">
        <button className="modal__close-btn" onClick={closeFn}><AiOutlineClose /></button>
        {children}
      </div>
    </>,
    document.getElementById('modal')
  );
}

export default Modal;