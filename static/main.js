(function () {
  const socket = io();
  $(document).ready(() => {
      $.get("/api/static",(data)=>{
          $("strong.mem").html(`Ram: ${data.totalmem} MB`);
          $("div.mem").html(`Free Ram: ${data.freemem_mb} MB`);
    socket.on("freemem", function (msg) {
        $("div.mem").html(`Free Ram: ${msg} MB`);
    });
},"json");
  });
})();
