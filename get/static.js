const os = require("os");
let data={};
data.arch=os.arch();
data.cpus=os.cpus();
data.homedir=os.homedir();
data.hostname=os.hostname();
data.network=os.networkInterfaces();
data.os=os.platform();//'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
data.codename=os.release();
data.tmpdir=os.tmpdir();
data.totalmem=os.totalmem()
data.osuptime=os.uptime();

module.exports=data;