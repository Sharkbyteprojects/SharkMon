const expr = require("express");
const app = expr();
const get = { static: require("./get/static"), dyn: require("./get/dynamic") };
app.use(expr.static("static"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/static/index.html");
});
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
  io.emit("freemem", data);
});
http.listen(process.env.PORT || 8080, () => {
  console.log("Listen on http://localhost:8080");
});
