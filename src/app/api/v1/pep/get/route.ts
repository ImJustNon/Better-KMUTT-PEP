import { NextResponse } from "next/server";
import pepData from "@/data/pep-data.json";

export async function GET(): Promise<NextResponse> {
    return NextResponse.json(pepData, {
        status: 200,
    });
}