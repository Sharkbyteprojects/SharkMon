const os = require("os");
module.exports = () => {
  let data = {};
  data.arch = os.arch();
  data.cpus = os.cpus();
  data.homedir = os.homedir();
  data.hostname = os.hostname();
  data.network = os.networkInterfaces();
  data.os = os.platform();
  data.codename = os.release();
  data.tmpdir = os.tmpdir();
  data.totalmem = Math.round(os.totalmem() * 0.000001);
  data.osuptime = os.uptime();
  data.freemem_mb = Math.round(os.freemem() * 0.000001);
  return data;
};
