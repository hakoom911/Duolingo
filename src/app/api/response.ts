import { NextResponse } from "next/server";

export default function response(message: string, result: any){
    return new NextResponse(JSON.stringify({
        message: message,
        result: result
    }))
}