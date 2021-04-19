const plt=require("os").platform();
process.exit((plt === "win32"||plt === 'linux')?1:0);