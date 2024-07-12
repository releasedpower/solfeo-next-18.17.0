import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const url = 'http://localhost:3050/solfeo/v1'
    try {
        const reqBody = await request.json();
        const { username, password } = reqBody;

        const response = await axios.post(`http://localhost:3050/solfeo/v1/users-front/`, {
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