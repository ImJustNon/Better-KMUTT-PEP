import { NextRequest, NextResponse } from "next/server";
import pepData from "@/data/pep-data.json";
import DataSearch from "@/utils/DataSearch";

type SearchRequestBody = {
    query?: string | null;
    year?: string | null;
    semester?: string | null;
    examType?: string | null;
    page?: string | null;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
    const pep = new DataSearch(pepData);
    const years = pep.getAllYears();
    const semesters = pep.getAllSemesters();
    const examTypes = pep.getAllExamTypes();

    return NextResponse.json({
        data: {
            years,
            semesters,
            examTypes
        }
    });
}