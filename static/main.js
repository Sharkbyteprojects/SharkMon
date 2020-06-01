(function () {
  const socket = io();
  $(document).ready(() => {
    socket.on("freemem", function (msg) {
      $("#messages").append($("<li>").text(msg));
    });
  });
})();
