import { NextResponse } from "next/server";
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import multer from "multer";
import multerS3 from "multer-s3";
import { authenticate } from "@/middlewares/authMiddleware";
import { connect } from "@/dbconfig/dbconfig";  // Your MongoDB connection
import { cookies } from "next/headers";

connect()

// Configure AWS S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Configure Multer with multer-s3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read", // File is publicly accessible
        contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set content type
        key: function (req, file, cb) {
            const fileExt = file.originalname.split(".").pop(); // Extract file extension
            const allowedExtensions = ["pdf", "docx"];

            if (!allowedExtensions.includes(fileExt)) {
                return cb(new Error("Invalid file type"), false);
            }

            const filename = `my_resume${Date.now()}.${fileExt}`;
            cb(null, filename); // Set filename in S3
        }
    }),
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});

// Middleware wrapper for Next.js API route
const uploadMiddleware = upload.single("resume");

export async function POST(req) {
    return new Promise((resolve, reject) => {
        uploadMiddleware(req, null, async (err) => {
            console.log("hi")
            if (err) {
                console.error("Upload error:", err);
                return resolve(NextResponse.json({ error: err.message }, { status: 400 }));
            }
            const request = await req.formData()
            const resume=request.get('resume')
            // File uploaded successfully
            if (!resume) {
                return resolve(NextResponse.json({ error: "No file uploaded" }, { status: 400 }));
            }

            const authResponse = await authenticate();

            if(authResponse instanceof NextResponse) return authResponse;
            const { user } = authResponse;

            const buffer = Buffer.from(await resume.arrayBuffer()); // Convert file to buffer
            const fileExt = resume.name.split(".").pop(); // Extract file extension
            const allowedExtensions = ["pdf", "docx"]; // Allowed file types

            if (!allowedExtensions.includes(fileExt)) {
              return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
            }

            const fileName = `my_resume_${Date.now()}.${fileExt}`; // Unique filename
            const uploadParams = {
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: fileName,
              Body: buffer,
              ContentType: resume.type, // Set file MIME type
            };

            // Upload file using PutObjectCommand
            await s3.send(new PutObjectCommand(uploadParams));
            
            const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            user.career.resume = fileUrl;  // Save the S3 file URL in the resume field
            await user.save();  // Save the updated user document

            // Step 5: Return success response with the updated resume URL
            return resolve(NextResponse.json({
                message: "Resume uploaded and user updated successfully!",
                resumeUrl: fileUrl,
            }));
        });
    });
}

