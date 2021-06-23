//import cloudinary related modules
const cloudinary = require("cloudinary").v2;
const multer = require("multer")

const {CloudinaryStorage} =require("multer-storage-cloudinary");


    //configure cloudinary
    cloudinary.config({
        cloud_name:'dyqqdqoof',
        api_key:'749621866276829',
        api_secret:'3HYFTu6tx9QymobGPov_5eC-2CE'
    });
    //configure cloudinary storage
    const clStorage=new CloudinaryStorage({
        cloudinary:cloudinary,
        params:async (req,file)=>{
            return{
                folder:"CDB003",
                public_key:file.fieldname + '-' + Date.now()
            }
        }
    })
    //configure multer
    const multerObj=multer({storage: clStorage})



module.exports=multerObj;