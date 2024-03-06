import { applicationError } from "../../errors/applicationError.js"
import userRepo from "../Repository/user.repository.js"
import userModel from "../models/user.modal.js"
import um from "../models/user.modal.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export default class userController{

    // Creating instance of repository class
    constructor(){
        this.userRepo = new userRepo
    }


    async signUp(req,res){
        try{
            const {name,email,password,type} = req.body
            const hashedPassword = await bcrypt.hash(password,12)
            const user = new userModel(name,email,hashedPassword,type)
            await this.userRepo.signUp(user)
            res.status(201).send('user created with id: ' + email)
        }catch(e){
            throw new applicationError('something went wrong',500)
        }  
    }


    async signIn(req,res){
        try{
            const result = await this.userRepo.findUserByEmail(req.body.email);
            if(!result){
                return res.status(400).send('Incorrect Credentials')
            }else{
                const matched = await bcrypt.compare(req.body.password, result.password)
                if(matched){
                    const token = jwt.sign({userId: result._id, email: result.email},"4mSvG1u36fdf4Z2uexZE8x8TblMF2k4A",{expiresIn:'2h'})
                    return res.status(200).send(token)
                }else{
                    return res.status(400).send('Incorrect Credentials')
                }
            }
        }catch(e){
            throw new applicationError("something went wrong with login process",500)
        }
        
    }
}