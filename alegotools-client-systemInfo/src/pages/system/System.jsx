import React, { useEffect, useState } from 'react';
import ListUsers from '../../components/ListUsers';
import './System.scss';

//node
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default function System() {
  const [info, setInfo] = useState([]);
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getSystemInfo() {
      const result = await ipcRenderer.invoke('sysInfo');
      setInfo(result);
    }
    getSystemInfo();

    async function getUsersInfo() {
      ipcRenderer.send('users', 'ping');
      ipcRenderer.on('useres', (req, res) => {
        setUsers(res);
      })
    }
    getUsersInfo();
  }, []);

  return (
    <div className="system-info-cont">
      <h1 className="users-list-title">Informações do Sistema</h1>
      <ul className='system-info-list'>
        {
          info.map((val, id) => (
            <li key={id} className='system-info-list__item'><div className='system-info-list__item__name'>{val.name}:</div>&nbsp;<div className='system-info-list__item__name'>{val.value}</div></li>
            ))
          }
      </ul>

      <h1 className="users-list-title">Lista de usuarios</h1>
      <ul className="users-list">
      {
          users.map((val) => (
            <ListUsers key={val.sid} accName={val.accName} reg={val.reg} dir={val.dir} />
          ))
        }
      </ul>
    </div>
  )
}
