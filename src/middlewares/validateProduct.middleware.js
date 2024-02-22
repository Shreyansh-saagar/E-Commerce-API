// rule to use export default - >
// it expects 3 things => 
// 1. hoisted declaration i.e. function
// 2. class
// 3. assignment expression
import { body , validationResult } from 'express-validator'


// added async coz we are using express-validator which uses promises.
const validateRequest = async (req,res,next)=>{  

// USING CONCEPT OF EXPRESS - VALIDATOR---------------------------------------
        // const {name,price,imgurl} = req.body
        // 1. setup rules

        const rules = [
            body('name').notEmpty().withMessage('Name is invalid'),
            body('price').isFloat({gt:0}).withMessage('Price is invalid'),
            body('desc').notEmpty().withMessage('Description is required'),
            body('category').notEmpty().withMessage('category is required'),
            body('image').custom((value,{req})=>{ //if we are using input type file in form data
                if(!req.file){
                    throw new Error('Image is required');
                }
                return true;
            })
            // when we are not using input type file in form data
            // body('image').isURL().withMessage('Image URL is invalid')
        ]

        // 2. run rules
        await Promise.all(
            rules.map((rule)=> rule.run(req))
        )

        // 3. check if there are errors after running the rules
        var validationErrors = validationResult(req);

        // 4. if errors, return the error message
        if(!validationErrors.isEmpty()){
            return res.send(validationErrors.array()[0]).msg
        }
        
        next();

}

export default validateRequest