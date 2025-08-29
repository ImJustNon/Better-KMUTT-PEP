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
                        <div className="text-lg font-thin text-white mt-5 text-center">
                            Disclaimer:  บ่ใช่ Official เด้อเเค่ทำให้มีดูดีขึ้นเเล้วค้นหาง่ายขึ้นหน่อย
                        </div>
                    </div>            
                </div>
            </div>
        </>
    );
}