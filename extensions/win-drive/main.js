const os=require("os").platform() === "win32";
function x(){
    if(os){
        try{
        const addon = require('./build/Release/wdrv');
        return {mb:addon.windriveUser(), fail:false};}catch(e){return {fail:true};}
    }else{
        return {fail:true};
    }
}
module.exports=x;