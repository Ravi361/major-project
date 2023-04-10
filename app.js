const express = require("express")
var app = express()
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name:'dye483mxr',
    api_key:974214917218457,
    api_secret:'MhfvkFjHP1ClvYuwbjn4mIF5BFw'
})
const EveryPixel = require('everypixel');
const api = new EveryPixel({
  "username": "ohh4C7sqUNmoqFCrPEWUkuka",
  "password": "Qwoa1gtN8kCBUfLDLi2Vh7K3fO4h8WzoDIexfqes4gD2L2kH"
});
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
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
app.post("/image",upload.single('image'),async (req,res)=>{
  //uploaded file url -> console.log(req.file.path)
   let ret = await api.keywords({"url": req.file.path, "num_keywords": 10});
   var prompt = ""
   for (var i = 0; i < ret.data['keywords'].length; i++) {
     prompt+= ret.data['keywords'][i]['keyword']+" "
   }
  const size = "small"
  const imageSize =
  size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
    const response = await openai.createImage({prompt,n: 1,size: imageSize,});
    const imageUrl = response.data.data[0].url;
    res.render('output',{url:imageUrl})
})
app.listen(3000, ()=>{
console.log("Server is running...")
});