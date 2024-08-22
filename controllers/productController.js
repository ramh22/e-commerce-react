import AppError from "../handleErrors/appError.js";
import catchAsync from "../handleErrors/catchAsync.js";
import { Product } from "../models/productModel.js";
import multer from "multer";
    import path from 'path'
import { deleteOne } from "./factory.js";


// Multer configuration
/*work with react file
var storage = multer.diskStorage(
    {
        destination: './uploads',
        // filename: function (req, file, cb ) {
        //     cb( null, file.originalname);
        // }
        filename: (req, file, cb) => {
            
            cb(null, 'iti'+file.fieldname +Date.now() +"-"+ file.originalname)
          },
    }
);
function fileFilter(req, file, cb) {
    let ext = path.extname(file.originalname);
    if (![".jpg", ".jpeg", ".png", ".jfif", ".gif",".pjpeg",".svg",".webp",".pjp"].includes(ext)) {
        cb(new Error("File type is not supported"), false);
        return;
    }
    cb(null, true);}
const upload = multer({ storage: storage ,fileFilter} )*/

 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        // Specify the filename for the uploaded file
        //console.log(req.file?.path)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pjpeg|svg|webp|pjp|jfif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

// Initialize `multer` with the storage options and file filter
const upload =multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(req.file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, 'iti-' + uniqueSuffix + '_' + file.originalname)
    }});

*/


// create
const createOneProduct = catchAsync(async (req, res, next) => {
    const { productName, price,  description ,category} = req.body;
    
    
    
    // Ensure required fields are present
    if (!productName || !price || !description||!category) {
        return next(new AppError('Product name, price, and description are required', 400));
    }
    if(!req.file){
        return next(new AppError('product Photo are required', 500));
    }
      
        const photo= `http://localhost:5000/uploads/${req.file?.filename}`;
    const newProduct = await Product.create({ productName, price,category, description ,photo});
    console.log(newProduct)
    res.status(200).json({
        msg: "success",
        data: newProduct,
        
    });

});

    //get all products
const getAllProducts=catchAsync(async(req, res,next) => {

 
      
        const products = await Product.find().sort({createdAt:-1})
    
  

       res.status(200).json([{msg:"success"},{products}])
    })
    //get product by id
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
    if (req.file) {
        req.body.photo=`http://localhost:5000/uploads/${req.file?.filename}`;
    }
    const updatedOne= await Product.findByIdAndUpdate(
        req.params.id, req.body,{
            new: true,
            runValidators: true
          });
    res.status(200).json({status:"success",data:{updatedOne}})

})
// const deleteProduct=deleteOne(Product)
//  const addcat = async (req, res, next) => {
//     // try {
//       const products=  await Product.updateMany(
//             { category: { $exists: false } },
//             { $set: { category: "electronics" } }
//         );
//         return res.send("done");
//     // }
//     // catch (err) {
//     //     next(err);
//     // }
// };
export{
    getAllProducts,
    createOneProduct,
    getOneProduct,
    deleteProduct,
    updateProduct,
    upload,
    
}


  