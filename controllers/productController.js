import AppError from "../handleErrors/appError.js";
import catchAsync from "../handleErrors/catchAsync.js";
import { Product } from "../models/productModel.js";
import multer from "multer";
    import path from 'path'
import { deleteOne } from "./factory.js";
// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname +Date.now() +"-"+ file.originalname)
    },
  })
  function fileFilter(req, file, cb) {
    let ext = path.extname(file.originalname);
    if (![".jpg", ".jpeg", ".png", ".jfif", ".gif",".pjpeg",".svg",".webp",".pjp"].includes(ext)) {
        cb(new Error("File type is not supported"), false);
        return;
    }
    cb(null, true);}
const upload = multer({ storage: storage,fileFilter});

/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(req.file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, 'iti-' + uniqueSuffix + '_' + file.originalname)
    }
});

*/
// create
const createOneProduct = catchAsync(async (req, res, next) => {
    const { productName, price,  description } = req.body;

    // Ensure required fields are present
    if (!productName || !price || !description) {
        return next(new AppError('Product name, price, and description are required', 400));
    }
        let photo = req.file ? req.file.path : '';
        console.log(req.file)
    const newProduct = await Product.create({ productName, price, photo, description });
    res.status(200).json({
        msg: "Product created successfully",
        data: newProduct
    });
});

      //Upload image to cloudinary
    //const result = await cloudinary.uploader.upload(req.file.path);

    //get all products
const getAllProducts=catchAsync(async(req, res,next) => {
    const products=await Product.find()
    if(!products){
        return next(new AppError('Products not found', 404));

    }
    res.status(200).json({msg:"success",products})
    })
const getOneProduct=catchAsync(async(req,res,next)=>{
    const productId=req.params.id
    let product =await Product.findById(productId).populate('ratings')
    if(!product){
        return next(new AppError("product not found",404))
    }
    res.status(200).json({status:"success",data:{product}})
})
const deleteProduct=catchAsync(async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        return next(new AppError("product not found",404))
    }
    const deletedProduct=await Product.findByIdAndDelete(product)
    res.status(204).json({status:"success",data:null})
})

const updateProduct=catchAsync(async(req,res,next)=>{
    const productId=req.params.id
    let product =await Product.findById(productId)
    if(!product){
        return next(new AppError("product not found",404))
    }
    const updatedOne= await Product.findByIdAndUpdate(
        req.params.id, req.body,{
            new: true,
            runValidators: true
          });
    res.status(200).json({status:"success",data:{updatedOne}})

})
// const deleteProduct=deleteOne(Product)
export{
    getAllProducts,
    createOneProduct,
    getOneProduct,
    deleteProduct,
    updateProduct,
    upload
}
/**

  */
 /**
  * exports.getAllorders = catchAsync (async (req, res, next)=> {
const features = new APIFeatures(Order.find(), req.query)
.filter()
.limitFields()
.sort()
.paginate();
const orders = await features.query;
const populated = await Order.populate(orders,
{path:"craft",
select: "name"});
const CraftOrders = populated.map((order)=>({
...order.toObject(),
craft: order.craft,
}));
const count = await Order.countDocuments();
//console,log(count);
res.status(200).json({
count,
results: CraftOrders
});
});
  */