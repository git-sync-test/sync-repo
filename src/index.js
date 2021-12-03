//UPLOAD FILES USING MULTER

const express=require("express");

const userController=require("./controller/user.controller");

const galleryController=require("./controller/gallery.controller");

const app=express();

app.use(express.json());

app.use("/users",userController);

app.use("/gallery",galleryController);

module.exports=app;