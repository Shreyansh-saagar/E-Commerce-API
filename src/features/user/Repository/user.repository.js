import { getDB } from "../../../config/mongodb.js";
import { applicationError } from "../../errors/applicationError.js";

class userRepo{
    async signUp(newUser){
        try{
            // 1.> Get database
            const database = getDB()
            // 2.> get collection
            const userCollection = database.collection('users')
            // 3.> Add data
            await userCollection.insertOne(newUser)
            return newUser;
        }catch(e){
            throw new applicationError("Something went wrong",500)
        }
    }


    async findUserByEmail(email) {

        try{
            // 1.> Get database
            const database = getDB()
            // 2.> get collection
            const userCollection = database.collection('users')
            // find data
            return await userCollection.findOne({email})
        }catch(e){
            throw new applicationError("Something went wrong with authentication",500)
        }
    }
}


export default userRepo;