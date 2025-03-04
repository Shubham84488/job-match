import { NextResponse } from 'next/server';
import jobseeker from '@/models/userModel';
import { connect } from '@/dbconfig/dbconfig';

connect()

export async function POST(request){
    try {
        const reqbody= await request.json()
        const {personalDetails, educationDetails, careerDetails } = reqbody;

        const newJobSeeker = new jobseeker({
            name: personalDetails.name,
            email: personalDetails.email,
            phone: personalDetails.phone,
            state: personalDetails.state,
            city: personalDetails.city,
            whatsapp: personalDetails.whatsapp,
            education: educationDetails,
            career: careerDetails,
        });
        await newJobSeeker.save();
        return NextResponse.json( 
            {message: "Profile created successfully!" }, 
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({error: "An unknown error occurred"},{status:500})
    }
}
