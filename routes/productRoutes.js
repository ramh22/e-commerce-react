
import express from "express";
import  verifyToken from "../middlewares/verifyToken.js";
import {restrictTo} from"../controllers/authController.js"
import { Rating } from "../models/ratingModel.js";
import { Product } from "../models/productModel.js";
 
import {
    upload,
    getAllProducts,
    createOneProduct,
    deleteProduct,
    getOneProduct,
    updateProduct,
    // addcat
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
// router('/addcat', async (req, res) => {
//     // try {
//        await Product.updateMany(
//             { category: { $exists: false } },
//             { $set: { category: "electronics" } }
//         );
//          res.send("done");
//     // }
//     // catch (err) {
//     //     next(err);
//     // }
// })
router
.route('/:productId/ratings')
.post(
    verifyToken,
    restrictTo('client'),
    createOneRate)
export default router;
//products/:productId/rating