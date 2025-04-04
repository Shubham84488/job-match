import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import recruiter from "@/models/recruiterModel";

export async function GET(req) {
    try {
        const cookiestore= await cookies()
        const token = cookiestore.get('token')?.value

        if(!token){
            return NextResponse.redirect('/login')
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const email = decoded.email

        const recruit = await recruiter.findOne({email})
        if(!recruit){
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(recruit,{status:200})
    } catch (error) {
        return NextResponse.json({ error: "Some Error occured" }, { status: 401 });
    }
}

export async function POST(req) {
    try {
        const request = await req.json()
        const {name , email , phone ,company , industry , website , location , linkedin ,description} = request

        const recruit = await recruiter.findOne({email})
        if(!recruit){
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        recruit.name = name || recruit.name;
        recruit.phone = phone || recruit.phone;
        recruit.company = company || recruit.company;
        recruit.industry = industry || recruit.industry;
        recruit.website = website || recruit.website;
        recruit.location = location || recruit.location;
        recruit.linkedin = linkedin || recruit.linkedin;
        recruit.description = description || recruit.description;

        await recruit.save();

        return NextResponse.json({ message: "Profile updated successfully", recruit }, { status: 200 });

    } catch (error) {
        
    }
}