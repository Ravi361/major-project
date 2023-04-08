const express = require("express")
var app = express()
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name:,
    api_key:,
    api_secret:
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
      folder: 'hreview',
      allowedFormats:['jpeg','png','jpg']
    }
  });
const upload=multer({storage})
app.set('view engine','ejs')
app.get("/",(req,res)=>{
 res.render('input')
})
app.post("/image",upload.single('image'),(req,res)=>{
  //uploaded file url -> console.log(req.file.path)
  res.render('output',{url:req.file.path})
})
app.listen(3000, ()=>{
console.log("Server is running...")
});