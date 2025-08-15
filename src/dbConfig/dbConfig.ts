import mongoose from "mongoose";

export async function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connect=mongoose.connection
        //!Indicates that MONGO_URL is not null or undefined and it has a value of type string.

        connect.on("connected",()=>{
            console.log('Connection successful to the database ')
            
        })

        connect.on("error",(error)=>{
            console.log('Connection not successful to the database'+error)
            
        })


    }catch(error){
        console.log("Error connecting to the database due to the error:",error)
    }
}