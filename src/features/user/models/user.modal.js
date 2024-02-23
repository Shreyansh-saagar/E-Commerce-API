export default class userModel{
    constructor(name, email, password, type,id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id
    }

    static signUp(name,email,password,type){
        const id =  user.length + 1
        const newUser = new userModel(name, email, password, type, id);
         
        user.push(newUser);
        console.log(user);
    }

    static signIn(email, password){
        const singleuser = user.find((u)=> u.email == email && u.password == password)
        return singleuser
    }

    static getAll(){
        return user
    }
} 

let user = [
    {
        name:"Admin user",
        email:"admin@example.com",
        password: "admin123",
        type:"seller",
        id: 1
    },{
        name:"shreyansh",
        email:"shre@gmail.com",
        password: "susanoo",
        type:"customer",
        id: 2
    },
]

// admin 1st token
// -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE3MDg1OTIwMzAsImV4cCI6MTcwODU5OTIzMH0.KHZ3qmH0seppCTmU6cQp_bTjYogcCT3PlHu1qa0WGxU