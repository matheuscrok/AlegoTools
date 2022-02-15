const { exec } = require('child_process');

const extractInformation = (stdout) => {
  const splitted = stdout.split('\r\n').filter((val) => val);
  splitted.pop();

  const usersReg = [];
  const arrLength = splitted.length;

  // Agrupar aos pares SID e DIR
  for(let i = 0; i < arrLength; i++) {
    if (!(i % 2 === 0)) {
      usersReg.push({
        reg: splitted.shift(),
        dir: splitted.shift()
      });
    }
  }

  const usersRegFiltered = usersReg.filter((user) => !user.dir.includes('systemroot'));

  // Montar campos
  usersRegFiltered.forEach((user) => {
    user.reg = user.reg.split('\\');
    user.reg[0] = 'HKLM';
    user.reg = user.reg.join('\\');

    user.accName = user.dir.split('\\');
    user.accName = user.accName[user.accName.length - 1];

    user.sid = user.reg.split('\\');
    user.sid = user.sid[user.sid.length - 1];

    user.dir = user.dir.split('    ');
    user.dir = user.dir[user.dir.length - 1];
  });

  return usersRegFiltered;
}

exports.getUsersInfo = () => {
  return new Promise((resolve, reject) => {
    exec('reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList" /v ProfileImagePath /s', (err, stdout, _) => {
      if (err) reject(err);
      resolve(extractInformation(stdout));
    });
  });
}
