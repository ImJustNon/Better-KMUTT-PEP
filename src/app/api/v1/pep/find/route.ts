import { NextRequest, NextResponse } from "next/server";
import pepData from "@/data/pep-data.json";
import DataSearch from "@/utils/DataSearch";

type SearchRequestBody = {
    query?: string | null;
    year?: string | null;
    semester?: string | null;
    examType?: string | null;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body: SearchRequestBody = await req.json();
    
    if(!body.query) body.query = null;
    if(!body.year) body.year = null;
    if(!body.semester) body.semester = null;
    if(!body.examType) body.examType = null;

    // return NextResponse.json(new DataSearch(pepData).search(body.query, body.year, body.semester, body.examType));
    return NextResponse.json(new DataSearch(pepData).getByOffset(0));
}