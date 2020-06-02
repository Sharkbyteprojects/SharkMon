const expr = require('express')
const app = expr()
const get = { static: require('./get/static'), dyn: require('./get/dynamic') }
app.use(expr.static(path.join(__dirname, 'static')))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html')
})
app.get('/api/static', (req, res) => {
  res.jsonp(get.static())
})
const http = require('http').createServer(app)
const io = require('socket.io')(http)
let numberOfUsers = 0
let freemem = get.static().freemem_mb
function resock () {
  process.stdout.write('\r')
  process.stdout.write(`Users: ${numberOfUsers} || Free Memory: ${freemem} MB`)
}
io.on('connection', (socket) => {
  numberOfUsers++
  resock()
  socket.on('disconnect', () => {
    numberOfUsers--
    resock()
  })
})
get.dyn.mem.subscribe((data) => {
  io.emit('freemem', data)
  freemem = data
  resock()
})
get.dyn.upt.subscribe((data) => {
  io.emit('ut', data)
})
http.listen(process.env.PORT || 8080, () => {
  console.log('Listen on http://localhost:8080')
})
