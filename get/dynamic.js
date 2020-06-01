const os = require("os");
const { Observable } = require("rxjs");
var prevmem = 0;
const toexp = Observable.create((observer) => {
  setInterval(() => {
    const mem = os.freemem();
    if (mem != prevmem) {
      if (mem > prevmem + 10 || mem < prevmem - 10) {
        observer.next(mem);
      }
    }
    prevmem = mem;
  }, 100);
});
module.exports = toexp;
