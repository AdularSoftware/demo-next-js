import {connect} from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import {NextRequest, NextResponse} from "next/server";



export async function POST(request: NextRequest) {
    try {
        console.log("1. Starting signup request");
        await connect();
        console.log("2. Database connected");
        
        const requestBody = await request.json();
        console.log("3. Request body:", requestBody);

        // Validate required fields
        if (!requestBody.username || !requestBody.email || !requestBody.password) {
            console.log("4. Missing fields");
            return NextResponse.json({error: "Username, email, and password are required"}, {status: 400});
        }

        const {username, email, password} = requestBody;
        console.log("5. Checking existing user");

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            console.log("6. User exists");
            return NextResponse.json({error: "User already exists"}, {status: 409});
        }

        console.log("7. Hashing password");
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create user with utc createAt
        const user = new User({username, email, password: hashedPassword, createdAt: new Date().toISOString()});
        const saveUserResult = await user.save();

        console.log("User created:", saveUserResult);

        return NextResponse.json({message: "User created successfully", user: saveUserResult, success: true}, {status: 201});
    } catch (error : any) {
        console.error("ERROR:", error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
