import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import jobseeker from "@/models/userModel";  // Adjust this based on your model

export async function authenticate() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const email = decoded.email;

        const user = await jobseeker.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return { user }; 
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
