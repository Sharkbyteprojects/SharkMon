const os = require('os')
const { Observable } = require('rxjs')
const freedisk = require('win-drive-internal-sharkmon')
var prevmem = 0
const toexp = Observable.create((observer) => {
  setInterval(() => {
    const mem = Math.round(os.freemem() * 0.000001)
    if (mem !== prevmem) {
      observer.next(mem)
    }
    prevmem = mem
  }, 100)
})
const uptime = Observable.create((observer) => {
  setInterval(() => {
    observer.next(os.uptime())
  }, 1000)
})
const freedisks = Observable.create((observer) => {
  const platform = os.platform()
  if (platform === 'win32' || platform === 'linux') {
    setInterval(() => {
      const fdv = freedisk()
      observer.next(fdv !== -1 ? fdv : 0)
    }, 3000)
  }
})
module.exports = { mem: toexp, upt: uptime, freedisks }
