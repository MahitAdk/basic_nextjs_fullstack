import {NextRequest, NextResponse} from 'next/server';
import jwt from "jsonwebtoken";


export const getDataFromToken=async(request:NextRequest){
    try{

        const token=request.cookies.get('token')?.value || ""
        const decodedtoken=jwt.verify(token,process.env.TOKEN_SECRET!)
        return decodedtoken.id//Not _id we are taking id from the login file and not from mongodb

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}