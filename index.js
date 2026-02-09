const express=require("express");
const app=express();
const PORT=8000;
app.get("/",(req,res) => {
    res.send("welcome to home page");
})
app.get("/user",(res,req) =>{
    res.send=("user page");
})
app.listen(PORT,()=>{
    console.log("server is listening to port 8000");

})
