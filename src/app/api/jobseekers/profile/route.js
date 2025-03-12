import { NextResponse } from 'next/server';
import jobseeker from '@/models/userModel';
import { connect } from '@/dbconfig/dbconfig';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request) {
    try {
        const reqbody = await request.json();
        const { personal, education, career } = reqbody;
        console.log(personal)
        // Find the user first
        const user = await jobseeker.findOne({ email: personal.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        // Update user details
        user.name = personal.name || user.name;
        user.phone = personal.phone || user.phone;
        user.state = personal.state || user.state;
        user.city = personal.city || user.city;
        user.whatsapp = personal.whatsapp || user.whatsapp;
        user.education = { ...user.education, ...education };
        user.career = { ...user.career, ...career };

        await user.save();

        return NextResponse.json(
            { message: "Profile updated successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        console.log(token)

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const email = decoded.email;

        // Find user
        const user = await jobseeker.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return user details
        return NextResponse.json(
            {
                personal: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    state: user.state,
                    city: user.city,
                    whatsapp: user.whatsapp,
                },
                education: user.education,
                career: user.career,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
