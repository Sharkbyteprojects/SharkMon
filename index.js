const app = require("express")();
const get = { static: require("./get/static"), dyn: require("./get/dynamic") };
app.get("/api/static", (req, res) => {
  res.jsonp(get.static);
});
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var numberOfUsers = 0;
function resock() {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  process.stdout.write(`Users: ${numberOfUsers}`);
}
io.on("connection", (socket) => {
  numberOfUsers++;
  resock();
  socket.on("disconnect", () => {
    numberOfUsers--;
    resock();
  });
});
get.dyn.subscribe((data) => {
  io.emit(data);
});
http.listen(8080, () => {
  console.log("Listen on http://localhost:8080");
});
