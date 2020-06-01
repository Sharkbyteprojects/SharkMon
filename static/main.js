(function () {
  const socket = io();
  const osselect = {
    linux: "oslinux",
    win32: "osms",
    darwin: "osapple",
    unkown: "osunkown",
  };
  function mkstr(st) {
    return `/icons/os/${st}.svg`;
  }
  function os(osname) {
    var x;
    if (osname == "linux") {
      x = mkstr(osselect.linux);
    } else if (osname == "win32") {
      x = mkstr(osselect.win32);
    } else if (osname == "darwin") {
      x = mkstr(osselect.darwin);
    } else {
      x = mkstr(osselect.unkown);
    }
    return x;
  }
  $(document).ready(() => {
    $.get(
      "/api/static",
      (data) => {
        $("object.os").attr("data", os(data.os));
        $("td.os").html(
          `<li>Arch: ${data.arch}</li><li>Homedir: ${data.homedir}</li><li>Hostname: ${data.hostname}</li><li>Release of OS: ${data.codename}</li><li>Temp Dir: ${data.tmpdir}</li><li class="uptime">OS Uptime: ${data.osuptime} seconds</li><li>OS Name: ${data.os}</li>`
        );
        $("strong.mem").html(`Ram: ${data.totalmem} MB`);
        $("div.mem").html(`Free Ram: ${data.freemem_mb} MB`);
        socket.on("freemem", function (msg) {
          $("div.mem").html(`Free Ram: ${msg} MB`);
        });
        socket.on("ut", function (msg) {
            $("li.uptime").html(`OS Uptime: ${msg} seconds`);
          });
        for (var cpu of data.cpus) {
          $("div.core").append(
            `<li>Cpu Model: ${cpu.model}<br>Speed: ${cpu.speed}MHz</li><br>`
          );
        }
    
            $("div.net").text(
              `${JSON.stringify(data.network)}`
            );
         
      },
      "json"
    );
  });
})();
