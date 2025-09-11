import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    let name = searchParams.get('name');

    if(!url){
        return NextResponse.json({ 
            error: "Missing URL parameter" 
        }, { 
            status: 400 
        });
    }

    if(!name) name = "kmutt-pep.pdf";


    try {
        // Fetch for SAML SimpleSAMLAuthToken cookie
        const samlResponse = await axios.get("https://auto-saml-kmutt.onrender.com/api/saml/request", {
            timeout: 30 * 1000,
        });
        if(!samlResponse.status || samlResponse.status !== 200){
            throw new Error(samlResponse.data.message);
        }
        

        const response = await axios.get(url, {
            responseType: "arraybuffer",
            headers: {
                "Accept":
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Accept-Language": "en-US,en;q=0.9,th-TH;q=0.8,th;q=0.7",
                "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
                "Referer": "https://dl.lib.kmutt.ac.th/",
                "Cookie":
                `SimpleSAMLphp=${samlResponse.data.data.simpleSAMLphp};SimpleSAMLAuthToken=${samlResponse.data.data.simpleSAMLAuthToken};`,
            },
        });

        const buffer = Buffer.from(new Uint8Array(response.data));

        const encodedName = encodeURIComponent(name);

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename=${encodedName}`,
            },
        });
    } catch (err: any) {
        return NextResponse.json({ 
            error: "Internal Server Error", 
            message: err.message ,
            targetUrl: url
        }, { 
            status: 500 
        });
    }
}
