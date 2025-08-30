import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";

export default function HeaderComponent(): React.JSX.Element {
    return(
        <>
           <div className="bg-gradient-to-r from-[#f7613b] to-[#f5aa2a]">
                <div className="container mx-auto w-full">
                    <div className="flex flex-col items-center justify-between py-20 px-5">
                        <div className="bg-[#ffffff]/35 backdrop-blur-md text-white px-5 py-3 rounded-2xl flex items-center justify-center mb-5 shadow-xl">
                            {/* <GraduationCap size={64} /> */}
                            <Image src={logo} alt="Logo" width={90} height={90} />
                        </div>
                        <div className="text-5xl font-bold font-serif text-white text-center">
                            KMUTT Past Exam Paper
                        </div>
                        <div className="text-xs font-bold text-white mt-3 text-center font-mono">Disclaimer</div>
                        <div className="text-xs font-thin text-white text-center font-mono">
                            This website is an independent project and is not affiliated with or endorsed by King Mongkut’s University of Technology Thonburi (KMUTT) or the official PEP system. The information and features provided here are for convenience and personal use only. For official information, please refer to KMUTT’s official channels and the official PEP website.
                        </div>
                    </div>            
                </div>
            </div>
        </>
    );
}