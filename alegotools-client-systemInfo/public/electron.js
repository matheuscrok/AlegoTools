const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const { exec } = require('child_process')
const fs = require('fs');
const os = require('os');
const { getUsersInfo } = require('./queryUsers.js');

//
// electron
//

function createWindow() {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,

    minHeight: 768,
    minWidth: 1024,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
    : "http://localhost:3000";

  // Automatically open Chrome's DevTools in development mode.
  // if (!app.isPackaged) {
  //   window.webContents.openDevTools();
  // }

  window.loadURL(appURL);
}

app.whenReady().then(() => {
  createWindow()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

//
// excluir usuario do windows ( registro e diretorio em Users )
//

module.exports = ipcMain.on('excluir', (event, data) => {
  // console.log(data.info)
  // let x = `reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\\${data.sId}"`

  // exec(x + " /f", (err) => {
  //   if (err) {
  //     return console.error(err);
  //   } else {
  //     const username = data.value;

  //     const cleanUserFolder = () => {
  //       let removerDir = `${data.info}`
  //       if (!data.info) return;

  //       exec(`rd /s /q ${removerDir}`, (err, stdout, _) => {
  //         if (err) {
  //           console.error(err.message);
  //         } else {
  //           console.log('Diretorio do usuário removido com sucesso');
  //         }
  //       });
  //     }

  //     cleanUserFolder();
  //     event.sender.send('excluires', `Usuário ${username} excluído com sucesso.`);
  //   }
  // });

  //
  // VERSAO 2
  //

  const { reg: deleteReg, dir: deleteDir, accName } = data;
  console.log(deleteReg, deleteDir);
  let operationStatus = 0;

  exec(`reg delete "${deleteReg}" /f`, (err, stdout, _) => {
    if (err) {
      console.log(`Erro ao apagar registro "${deleteReg}".`);
      console.log('Err message:', err.message);
      return;
    }

    operationStatus = 1;
    console.log(`Registro "${deleteReg}" apagado com sucesso.`);
    console.log('Stdout:', stdout);

    exec(`rd /s /q "${deleteDir}"`, (err, stdout, _) => {
      if (err) {
        console.log(`Falha ao apagar diretorio "${deleteDir}".`);
        console.log('Err message:', err.message);
        return;
      }

      operationStatus = 2;
      console.log(`Diretorio "${deleteDir}" apagado com suceso.`);
      console.log('Stdout:', stdout);
    });
  });

  const res = operationStatus === 0
    ? `Falha ao apagar usuário "${accName}".`
    : `Usuário "${accName}" apagado com sucesso.`;

  event.sender.send('excluires', res)
});

//
// obter usuários do windows
//

module.exports = ipcMain.on('users', async (event, argument) => {
  // exec('reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList"', (err, stdout, stderr) => {
  //   let users = stdout.split('\r\n' +
  //     'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\r\n' +
  //     '    Default    REG_EXPAND_SZ    %SystemDrive%\\Users\\Default\r\n' +
  //     '    ProfilesDirectory    REG_EXPAND_SZ    %SystemDrive%\\Users\r\n' +
  //     '    ProgramData    REG_EXPAND_SZ    %SystemDrive%\\ProgramData\r\n' +
  //     '    Public    REG_EXPAND_SZ    %SystemDrive%\\Users\\Public\r\n' +
  //     '\r\n' +
  //     'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\\S-1-5-18\r\n' +
  //     'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\\S-1-5-19\r\n' +
  //     'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\\S-1-5-20\r\n');

  //   const arrUsers = users[1].split('\r\n')
  //   arrUsers.pop()

  //   arrUsers.forEach((user) => {
  //     const test = user.split('\\')
  //     const sid = test[test.length - 1];
  //     const last3 = sid.slice(-4)

  //     if (!(last3 === '-500')) {
  //       exec(`reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\\${sid}"`, (err, stdout, stderr) => {
  //         const dir = stdout.split('\r\n')
  //         const info2 = dir[2].split(' ')
  //         const info3 = info2[info2.length - 1]
  //         const userDir = info3.split('\\')
  //         const userName = userDir[userDir.length - 1]

  //         const info = {
  //           userName: userName,
  //           userSid: sid,
  //           useInfo: info3
  //         }

  //         console.log(info);
  //         event.sender.send('useres', info)
  //       })
  //     }
  //   })
  // })

  //
  // VERSAO 2
  //

  try {
    const data = await getUsersInfo();
    // console.log(data);
    event.sender.send('useres', data);
  } catch (err) {
    console.log(err);
  }

});

//
// instalar drivers
//

module.exports = ipcMain.on('instaldrivers', (event, data) => {
  let x = `drivers\\${data}`
  exec(x, (event, stdout, stdrr) => {
    console.log(event)
    console.log(stdout)
    console.log(stdrr)
  })
})

//
// instalar programa
//

module.exports = ipcMain.on('instal', (event, data) => {
  let x = `programas\\${data}`
  exec(x, (event, stdout, stdrr) => {
    console.log(event)
    console.log(stdout)
    console.log(stdrr)
  })

})

//
// listar drivers
//

module.exports = ipcMain.on('drivers', (event, data) => {
  let y = "drivers"
  processLineByLine();
  async function processLineByLine() {
    fs.readdir(y, (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          event.sender.send('driveres', file)
        })
      }
    })
  }
})

//
// listar programas
//

module.exports = ipcMain.on('read', (event, data) => {
  let y = "programas"
  processLineByLine();
  async function processLineByLine() {
    fs.readdir(y, (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          event.sender.send('res', file)
        })
      }
    })
  }
})

//
// obter informacoes do sistema
//

module.exports = ipcMain.handle('sysInfo', async (event, argument) => {
  const info = [];

  const addInfo = (name, value) => {
    info.push({ name, value });
  }

  // Tratativas diferentes para obter IP e MAC para Windows e Mac
  if (os.platform() === 'darwin') {
    // Caso maquina for MacOS
    os.networkInterfaces().en0.forEach((obj) => {
      if (obj.family === 'IPv4') {
        addInfo('IP (local)', obj.address);
        addInfo('MAC', obj.mac);
      }
    })
  } else if (os.platform() === 'win32') {
    // Caso maquina for Windows
    os.networkInterfaces().Ethernet.forEach((obj) => {
      if (obj.family === 'IPv4') {
        addInfo('IP (local)', obj.address);
        addInfo('MAC', obj.mac);
      }
    })
  }

  addInfo('Nome da máquina', os.hostname());
  addInfo('Plataforma', os.platform());
  addInfo('Versão do S.O.', os.version());
  addInfo('Release', os.release());
  addInfo('Usuário atual', os.userInfo().username);

  return info;
})
