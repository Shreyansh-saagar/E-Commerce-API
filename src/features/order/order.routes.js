import express from "express";
import orderController from "./order.controller.js";


const orderrouter = express.Router();
const oc = new orderController()

orderrouter.post('/',(req,res)=>{
    oc.placeOrderController(req,res)
})

export default orderrouter;