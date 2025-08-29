import { NextRequest, NextResponse } from "next/server";
import pepData from "@/data/pep-data.json";
import DataSearch from "@/utils/DataSearch";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body = await req.json();
    
    if(!body.offset || isNaN(body.offset) || body.offset < 0){
        return NextResponse.json({ error: "Invalid offset" }, {
            status: 400,
        });
    }

    return NextResponse.json(new DataSearch(pepData).getByOffset(body.offset), {
        status: 200,
    });
}