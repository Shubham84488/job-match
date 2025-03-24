import jobModel from "@/models/jobModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";

connect()

export async function GET(request) {
    try {
        const job= await jobModel.find()
        return NextResponse.json(job,{status:200})
    } catch (error) {
        return NextResponse.json({message: "Some error occured"},{status:404})
    }
}