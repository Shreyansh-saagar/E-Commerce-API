//to manage paths of product controller
// 1. import express
// 2. initialize express router

import express from "express";
import productController from "./controllers/product-controller.js";

import { uploadFile } from "../../middlewares/upload-file.middleware.js";
import validateRequest from "../../middlewares/validateProduct.middleware.js";

const router = express.Router();
const pc = new productController()

router.get('/',(req,res)=>{
    pc.getAllProducts(req,res);
})

// using query parameter -> /api/product/getFilterProduct?minPrice=10&maxPrice=100&cateogory=category
router.get('/filter',(req,res)=>{
    pc.getFilteredProduct(req,res);
})

router.get('/:id',(req,res)=>{
    pc.getOneProduct(req,res);
})





router.post("/",uploadFile.single('image'),validateRequest,(req,res)=>{
    pc.addProduct(req,res);
})

router.post('/rate',(req,res,next)=>{
    pc.rateProduct(req,res,next);
})

export default router;