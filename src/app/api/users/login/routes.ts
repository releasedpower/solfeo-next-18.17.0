import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const url = process.env.BACKEND_URL;
    try {
        const reqBody = await request.json();
        const { username, password } = reqBody;

        const response = await axios.post(`${url}/users-front/login`, {
            username,
            password,
          });
        return NextResponse.json({
            message: "Ok",
            result: response.data
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}