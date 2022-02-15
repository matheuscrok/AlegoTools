import React, { useEffect, useState } from 'react';
import './Programs.scss';
import List from '../../components/List'


//node
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  var id = 0;


  useEffect(() => {

    let mounted = true;
    ipcRenderer.send('read', 'ping')
    
    
    ipcRenderer.on('res', (req, res) => {
        if(mounted){
        setPrograms(prevState => [...prevState, { id: id, name: res }])
        id++;
      }
      })

    return () => mounted = false;

  }, [id]);


  return (
    <div className="programs" style={{overflowY:'scroll'}}>
      <h1 className="programs__title">Programs page</h1>

      {

        programs.map(({ id, name }) => (
          <List
            key={id}
            value={name}
          />
        ))

      }
    </div>
  )
}