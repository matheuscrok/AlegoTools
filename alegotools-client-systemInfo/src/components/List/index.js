import React from 'react';
import './app.scss';


//node
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


const List = ({ value,prog }) => {

    async function install() {

        if (value != null) {

            return await ipcRenderer.send('instal', value)
        } else {

            return console.log('nao foi possivel')
        }

    }

    return (
        <div className="Item-container" >
            
            <input
                className="Item-field"
                value={value}
                readOnly
            />
            <button onClick={() => install()}>Instalar</button>
        </div>
    );
};

export default List;