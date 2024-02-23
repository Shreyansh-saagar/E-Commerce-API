//to manage paths of product controller
// 1. import express
// 2. initialize express router

import express from "express";
import productController from "./controllers/product-controller.js";

import { uploadFile } from "../../middlewares/upload-file.middleware.js";
import validateRequest from "../../middlewares/validateProduct.middleware.js";

const router = express.Router();
const pc = new productController()

router.get('/',pc.getAllProducts)
router.get('/:id(\\d+)',pc.getOneProduct)


// using query parameter -> /api/product/getFilterProduct?minPrice=10&maxPrice=100&cateogory=category
router.get('/getFilterProduct',pc.getFilteredProduct)


router.post("/",uploadFile.single('image'),validateRequest,pc.addProduct)

router.post('/rate',pc.rateProduct)

export default router;