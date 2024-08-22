
import express from "express";
import  verifyToken from "../middlewares/verifyToken.js";
import {restrictTo} from"../controllers/authController.js"
import { Rating } from "../models/ratingModel.js";
import { Product } from "../models/productModel.js";
// import fileUpload from "express-fileupload"
import path from 'path'
import {
    upload,
    getAllProducts,
    createOneProduct,
    deleteProduct,
    getOneProduct,
    updateProduct,
    // addcat2706400
  } from "../controllers/productController.js"
import { createOneRate } from "../controllers/ratingController.js";
const router=express.Router()
// router.use(fileUpload())



    router.route('/').post(upload.single('photo'), createOneProduct)
     router.route('/').get(getAllProducts)

    router
    .route('/:id')
    .delete( deleteProduct)
    .get(getOneProduct)
    .patch(upload.single("photo"),updateProduct)


router
.route('/:productId/ratings')
.post(
    verifyToken,
    restrictTo('client'),
    createOneRate)
export default router;
//products/:productId/rating