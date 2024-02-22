//to manage paths of product controller
// 1. import express
// 2. initialize express router

import express from "express";
import userController from "./controllers/user.controller.js";

const userrouter = express.Router();
const uc = new userController()

userrouter.post('/signup',uc.signUp)
userrouter.post('/signin',uc.signIn)


export default userrouter;