import React from "react";
import logo from "../assets/logo.svg";
import Image from "next/image";

export default function HeaderComponent(): React.JSX.Element {
    return(
        <>
            <div className="bg-university-gradient">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center text-white">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                                <img src={logo} alt="University Logo" className="h-16 w-16 object-contain" />
                            </div>
                        </div>
                        <div className="text-5xl md:text-6xl font-bold mb-4">
                            University Exam Archive
                        </div>
                        {/* <di className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Search and download past examination papers from our comprehensive digital library
                        </di> */}
                    </div>
                </div>
            </div>
        </>
    );
}