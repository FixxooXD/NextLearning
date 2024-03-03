import { connect } from "@/dbConfig/Dbconfig"
import User from "@/app/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest){

     try {
       const reqBody = await request.json();
       const { userName, email, password } = reqBody;

    //    we'll do validation Later

    // Check if user already exist
     const user =  await User.findOne({email})
     user ? NextResponse.json({error: "user alredy Exist"}, {status: 400}) :  null;


     //hash Password
     const salt = await bcryptjs.genSalt(10);
     const hashedPassword = await bcryptjs.hash(password, salt);

     const newUser =  new User({
        userName,
        email,
        password: hashedPassword
     })

     const savedUser = await newUser.save()
     console.log(savedUser);

     return NextResponse.json({
        message: "user created Successfully",
        success: true,
        savedUser
     })
     

     } catch (error: any ) {
        return NextResponse.json({error: error.message}, {status: 500})
     }
}