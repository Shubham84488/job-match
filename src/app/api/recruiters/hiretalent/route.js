import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import recruiter from "@/models/recruiterModel";
import { connect } from "@/dbconfig/dbconfig";
import bcryptjs from 'bcrypt';

connect()
export async function POST(request){
    try {
        const req = await request.json();
        const password = req.password;
        const existingRecruiter = await recruiter.findOne({ email: req.email });
        if(existingRecruiter){
            return NextResponse.json({message: "Recruiter already exist"},{status:404})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const recruit = await recruiter.create({...req,password:hashedPassword});

        await recruit.save();

        return NextResponse.json(
            { message: "Recruiter created successfully", success: true },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error in user registration:", error);
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}