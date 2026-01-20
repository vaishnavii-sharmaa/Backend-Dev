const fs=require("fs");
// fs.copyFile("test.txt","new_test.txt");
// fs.copyFileSync("test.txt","dest.txt");
fs.copyFile("test.txt","new_test.txt",(err)=>{
    if(err){
        console.log("error while file is copied",err);
    }
    else{
        console.log("file is copied successfully");
    }
})
fs.copyFileSync("test.txt","dest.txt")
console.log("file is copied")
fs.unlink("dest.txt",(err)=>{
    if(err){
        console.log("error while deleting file",err,err);
    }
    else{
        console.log("file deleted successfully")
    }
})