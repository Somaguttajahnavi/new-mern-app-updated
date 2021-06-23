const exp=require("express")
const productApi=exp.Router();
productApi.use(exp.json())
const expressErrorHandler=require("express-async-handler")
const multerObj=require('./middlewares/addfile')

//create product
productApi.post('/createproduct',multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
    let productCollectionObject=req.app.get("productCollectionObject")
    const newProduct=JSON.parse(req.body.productObj);
    //check product by model no
    let product=await productCollectionObject.findOne({model:newProduct.model})
    //if model already existed
    if(product!==null){
        res.send({message:"product already existed"})
    }
    else{
        newProduct.productImage=req.file.path;
        await productCollectionObject.insertOne(newProduct)
        res.send({message:"new product is added"})
    }
}))

//get products
productApi.get("/viewproducts", expressErrorHandler(async (req, res, next) => {

    let productCollectionObject = req.app.get("productCollectionObject");

    let products = await productCollectionObject.find().toArray();
    res.send({ message: products })

}))


module.exports=productApi;