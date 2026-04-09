import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import connectToDatabase from "@/utils/db";

export async function POST(req : NextRequest){
    const {name,password,email} = await req.json();
    
    try {
        const hashPassword = await bcrypt.hash(password,parseInt(process.env.SECRET_SALT!));
        await connectToDatabase()
        const user = await UserModel.create({name,email,hashPassword,})
        return NextResponse.json({success:true,message:"User Created",user},{status:201})
    } catch (error) {
        console.log(error)
    }
}