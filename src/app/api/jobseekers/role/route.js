import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookie = await cookies()
        const token = cookie.get('token')?.value
        
        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
        const role = decoded.role
        return NextResponse.json({role},{ status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}