import React, { useState } from 'react';
import './app.scss';
import Modal from '../dialog/Modal.jsx';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default function ListUsers({ accName, reg, dir }) {
    const [modalOpen, setModalOpen] = useState(false);

    function refreshPage() {
        window.location.reload();
    }

    async function remove() {
        ipcRenderer.send('excluir', { reg, dir, accName })

        ipcRenderer.on('excluires', (event, data) => {
            setModalOpen(false);
            console.log(data);
            return refreshPage();
        });
    }

    return (
        <li className="Item-container">
            <input
                className="Item-field"
                value={accName}
                readOnly
            />
            <div className="ModalBtn">
                <button
                    className="openModalBtn"
                    onClick={() => {
                        setModalOpen(true);
                    }}
                >
                    Apagar
                </button>
            </div>

            <Modal show={modalOpen} closeFn={() => setModalOpen(false)}>
                <p className="modal-text">APAGAR PERMANENTEMENTE usuário: "{accName}" ?</p>
                <div className="modal__btn__cont">
                    <button className="modal__btn modal__btn--cancell" onClick={() => setModalOpen(false)}>Cancelar</button>
                    <button className="modal__btn modal__btn--confirm" onClick={() => remove()}>Confirmar</button>
                </div>
            </Modal>
        </li>
    );
};
