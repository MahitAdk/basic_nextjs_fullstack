import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";

connectDB();


export async function POST(request:NextRequest){


    try{
        const reqbody=await request.json()//Asking for data from request body
        const {token}=reqbody//Token is taken from request body that is in json format

        const user=await User.findOne({verifyToken:token},{verifyTokenExpiry:{$gt:Date.now()}})//Verifying token and checking expiry in order to confirm email

        if(!user){
            return NextResponse.json({error:"Can't verfify mail"},{status:500})
        }

        user.verifyToken=undefined
        user.verifyTokenExpiry=undefined

        await user.save()//Since this action is taking place in db we need to use await at first save it

    }catch(error:any){
        NextResponse.json({error:error.message},{status:500})

    }
}