import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connectDB(); 


export async function POST(request:NextRequest){

    try{

        const reqbody=request.json()
        const {username,email,password}=await reqbody;

        const user=User.findOne({email})

        if(!user){
            return NextResponse.json({error:'User not found'},{status:500})
        }

        const credentials=await bcryptjs.compare(password,user.password)

        if(!credentials){
            return NextResponse.json({error:'Invalid credentials'},{status:500})
        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'7d'})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    }catch(error:any){
        NextResponse.json({error:error.message},{status:500})
    }
}    