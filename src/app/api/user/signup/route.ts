import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";

connectDB();

export async function POST(request:NextRequest){
    try{

        const reqbody=request.json()
        const {username,email,password}=await reqbody;

    }catch(error:any){
        return NextResponse.json({error:'Error '},{status: 500});
    }

}