const app = require("express")();

const http = require("http").createServer(app);
http.listen(8080, () => {
  console.log("Listen on http://localhost:8080");
});
