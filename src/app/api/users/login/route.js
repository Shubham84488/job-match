import { connect } from "@/dbconfig/dbconfig";
import bcryptjs from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest,NextResponse } from "next/server";
import jobseeker from "@/models/userModel";

connect()

export async function POST(request){
    try {
        const reqbody = await request.json()
        const {email,password} = reqbody

        const user = await jobseeker.findOne({email})
        if(!user){
            return NextResponse.json({message: "User does not exist"},{status:400})
        }

        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({message:"Invalid password"},{status:400})
        }

        const tokenData= {
            id: user._id,
            email: user.email
        }
        console.log(tokenData)
        const accessToken = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET,
            {expiresIn:"1d"}
        )
        const response = NextResponse.json({
            message:"Login Successful",
            success:true
        })
        response.cookies.set("token",accessToken,{
            httpOnly:true
        })
        return response
    } catch (error) {
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}