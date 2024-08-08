//import { Cart } from "../models/cartModel.js";
import catchAsync from "../handleErrors/catchAsync.js"
import AppError from "../handleErrors/appError.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
//get all Rating
// const getAllRatings=catchAsync(async(req, res) => {
//     const cart=await Cart.find()
//     res.status(200).json({
//         msg:"success",
//         data:{Ratings}})
//     })
// //create add to cart
 const AddProductToCart=catchAsync(async(res,req,next)=>{
    //  if(!req.body.product)req.body.product=req.params.id
    const {id}=req.body

    if(!id){
       return next(new AppError("product is required",404)) 
    }
    const product=await Product.findById(id)
    if(!product){
        return next(new AppError("product does not found",404)) 
     }
     if(req.user.myCart.includes(product))return next(new AppError("product added to cart ",404)) 
    
//     //from token  
//     //protect middleware - verifyToken
    if(!req.body.user)req.body.user=req.user.id
    const productAddedToCart=await User.findByIdAndUpdate(req.user._id,
        {myCart:[...req.user.cart,product._id]},
        {new:true,useFindAndModify})
     res.status(200).json({
         msg:"success",
         data:{productAddedToCart}})
     })
    //  const getAllProductsOnCart=catchAsync(async(req, res) => {
    //     const productsOnMyCart=await Cart.find({addedToCart:true})
    //     res.status(200).json({
    //         msg:"success",
    //         data:{productsOnMyCart}})
    //     })  

    //     const deleteFromCart=catchAsync(async(res,req,next)=>{
    //         if(!req.body.product)req.body.product=req.params.id
    //    //     //from token  
    //    //     //protect middleware - verifyToken
    //        if(!req.body.user)req.body.user=req.user.id
    //         const deleteProductFromCart=await Cart.findByIdAndUpdate(req.params.id,{addedToCart:false})
    //         res.status(200).json({
    //             msg:"success",
    //             data:null})
    //         })
   export {AddProductToCart,}   