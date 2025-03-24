import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request){
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");

        return NextResponse.json({ message: "Token removed successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Some error occurred" }, { status: 500 }); 
    }
}