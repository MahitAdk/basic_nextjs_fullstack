import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { get } from "http";
import { getDataFromToken } from "@/helper/getDataFromToken";


connectDB(); 


export async function POST(request:NextRequest){

    //Extract data from token
    const UserId=await getDataFromToken(request);
    const user=User.findById(UserId).select("-password");
    return NextResponse.json({message:"User data fetched successfully",user}, {status: 200});
}

