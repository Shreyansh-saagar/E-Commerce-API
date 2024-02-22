import um from "../models/user.modal.js"
import jwt from "jsonwebtoken"

export default class userController{
    signUp(req,res){
        const {name,email,password,type} = req.body
        um.signUp(name,email,password,type)
        res.status(201).send('user created with id: ' + email + ' and password: ' + password)
    }


    signIn(req,res){
        const result = um.signIn(req.body.email, req.body.password)
        if(!result){
            return res.status(400).send('Incorrect Credentials')
        }else{
            // create token
            const token = jwt.sign({userId: result.id, email: result.email},"4mSvG1u36fdf4Z2uexZE8x8TblMF2k4A",{expiresIn:'2h'})

            // send token
            return res.status(200).send(token)
        }
    }
}