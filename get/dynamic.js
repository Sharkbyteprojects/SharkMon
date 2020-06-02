const os = require("os");
const { Observable } = require("rxjs");
var prevmem = 0;
const toexp = Observable.create((observer) => {
  setInterval(() => {
    const mem = Math.round(os.freemem() * 0.000001);
    if (mem != prevmem) {
      observer.next(mem);
    }
    prevmem = mem;
  }, 100);
});
const uptime = Observable.create((observer) => {
  setInterval(() => {
    observer.next(os.uptime());
  }, 1000);
});
module.exports = { mem: toexp, upt: uptime };
