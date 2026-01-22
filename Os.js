const os=require("os");
const fs=require("fs");
console.log(os.platform());//Check Operating System Platform
console.log(os.arch());//Check Architecture (32bit / 64bit)
console.log(os.cpus());
console.log(os.freemem());//Shows available memory
console.log(os.totalmem());//Returns RAM in bytes
console.log(os.hostname());
console.log(os.type());
const totalmemory=os.totalmem();
const freememory=os.freemem();
const platform=os.platform();
