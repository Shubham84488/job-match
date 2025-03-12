import { connect } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import bcryptjs from 'bcrypt';
import JobSeeker from "@/models/userModel";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { name, email, password } = reqBody;

        // Check if user already exists
        const existingUser = await JobSeeker.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newJobSeeker = new JobSeeker({
            name,
            email,
            password: hashedPassword,
        });

        await newJobSeeker.save();

        return NextResponse.json(
            { message: "Job seeker created successfully", success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in user registration:", error);
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
