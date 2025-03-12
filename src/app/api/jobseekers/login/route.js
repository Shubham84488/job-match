import { connect } from "@/dbconfig/dbconfig";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import jobseeker from "@/models/userModel";
import recruiter from "@/models/recruiterModel";

connect();

export async function POST(request) {
    try {
        const reqbody = await request.json();
        const { email, password, role } = reqbody;

        let user;
        if (role === "jobseeker") {
            user = await jobseeker.findOne({ email });
        } else if (role === "recruiter") {
            user = await recruiter.findOne({ email });
        } else {
            return NextResponse.json({ message: "Invalid role" }, { status: 400 });
        }

        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }

        const tokenData= {
            id: user._id,
            email: user.email,
            role:role
        }
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
        console.error("Login Error:", error);
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
