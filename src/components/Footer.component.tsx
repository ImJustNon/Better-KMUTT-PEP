import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { Github } from "lucide-react";

export default function FooterComponent(): React.JSX.Element {
    return(
        <>
           <div className="bg-gradient-to-r from-[#681600] to-[#6e4600]">
                <div className="flex flex-row justify-between items-center py-5 px-3 container mx-auto shadow-xl">
                    <div className="flex flex-col">
                        <div className="text-sm font-semibold font-mono">Made with ❤️ by TGDTEL</div>
                        <a href="https://github.com/ImJustNon/Better-PEP" target="_blank" className="flex flex-row items-center mt-2 duration-150 hover:text-[#ababab]">
                            <Github size={20} />
                            <div className="ml-1 text-sm font-semibold font-mono">Source Code on Github</div>
                        </a>
                    </div>
                    <a href="https://dl.lib.kmutt.ac.th/repository/pep.php" target="_blank" className="text-xs font-semibold font-mono hover:text-[#ababab] duration-150">Original Source</a>
                </div>
            </div>
        </>
    );
}