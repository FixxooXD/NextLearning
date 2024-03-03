import { connect } from "@/dbConfig/Dbconfig"
import User from "@/app/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
   try {

    const reqBody = await request.json();
    const {email, password} = reqBody;
    console.log(reqBody);

    //Check if user exist
    const user = await User.findOne({email});

    if(!user){ 
        return NextResponse.json({error: "user Not found"}, {status: 400})
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if(!validPassword){ 
        return NextResponse.json({error: "Invalid password"}, {status: 400})
    }

    const tokenData = {
        id: user._id,
            userName: user.userName,
            email: user.email
    }

    //create Token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    const response = await NextResponse.json({
        message: "Login Successful",
        success: true,
    })

    response.cookies.set("token", token, {httpOnly: true})
    return response;
    
    
   } catch (error: any) {
     return NextResponse.json({error: error.message}, {status: 500})
   }
}