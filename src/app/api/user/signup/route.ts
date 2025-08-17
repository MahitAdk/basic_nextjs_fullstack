import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {sendmail} from "@/helper/mailer";

connectDB();

export async function POST(request:NextRequest){
    try{

        const reqbody=request.json()
        const {username,email,password}=await reqbody;

        const user=await User.findOne({email})

        if(user){
            return NextResponse.json({error:'User already exists'},{status: 400});
        }

         const Salt=await bcryptjs.genSalt(10)//Generates a unique salt for password hashing

    //salt is a unique, pseudorandom string that is added to a password before it is hashed

    const Hashedpassword=await bcryptjs.hash(password,Salt)

    const newUser=new User({
        username,email,password:Hashedpassword
    })

    const savedUser=await newUser.save()

    await sendmail({email,emailtype:"VERIFY",userId:savedUser._id})

    //Send verification email logic can be added here



    }catch(error:any){
        return NextResponse.json({error:'Error '},{status: 500});
    }

   


}