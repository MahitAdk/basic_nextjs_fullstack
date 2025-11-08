import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connectDB(); 


export async function POST(request:NextRequest){

    try{

        //All that's needed to logout is to delete the token from the client side.
        const response = NextResponse.json({ message: "Logout successful", success: true }, { status: 200 });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // Set the cookie to expire in the past
           
        });

        return response;

    }catch(error:any){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}