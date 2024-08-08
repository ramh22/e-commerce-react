
import express from "express";
import  verifyToken from "../middlewares/verifyToken.js";
import {restrictTo} from"../controllers/authController.js"
import { Rating } from "../models/ratingModel.js";

 
import {
    upload,
    getAllProducts,
    createOneProduct,
    deleteProduct,
    getOneProduct,
    updateProduct
  } from "../controllers/productController.js"
import { createOneRate } from "../controllers/ratingController.js";
const router=express.Router()
router
    .route('/')
    .get(getAllProducts)
    .post(verifyToken,upload.single("photo"), createOneProduct)

    router
    .route('/:id')
    .delete( verifyToken, deleteProduct)
    .get(getOneProduct)
    .patch(verifyToken,upload.single("photo"),updateProduct)

// router.get('/verify/:token', verifyAccount)

router
.route('/:productId/ratings')
.post(
    verifyToken,
    restrictTo('client'),
    createOneRate)
export default router;
