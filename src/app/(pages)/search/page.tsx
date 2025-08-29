"use client"

import { Book, BookOpen, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, Download, FileText, GraduationCap, SearchCheck, SearchIcon,  } from "lucide-react";
import logo from "../../../assets/logo.svg";
import Image from "next/image";
import { ButtonGroup, createListCollection, IconButton, Pagination, Portal, Select } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import { PepSpecs } from "@/utils/DataSearch";
import { LocalStorage } from "@/utils/LocalStorage";

export default function Search(): React.JSX.Element {

    const [pepData, setPepData] = useState<PepSpecs[]>([]);

    useEffect(() => {
        (async() => {
            const getPof = new LocalStorage().getPageOffset();
            const response = await axios.post("/api/v1/pep/offset",{
                offset: getPof
            });
            console.log(response.data);
            setPepData(response.data);
        })();
    }, []);
    return(
        <>
            <div className="bg-gradient-to-r from-[#f7613b] to-[#f5aa2a]">
                <div className="container mx-auto w-full">
                    <div className="flex flex-col items-center justify-between py-20 px-5">
                        <div className="bg-[#ffffff]/35 backdrop-blur-md text-white px-5 py-3 rounded-2xl flex items-center justify-center mb-5 shadow-xl">
                            {/* <GraduationCap size={64} /> */}
                            <Image src={logo} alt="Logo" width={90} height={90} />
                        </div>
                        <div className="text-5xl font-bold text-white text-center">
                            KMUTT Pass Exam Paper
                        </div>
                        <div className="text-lg font-thin text-white mt-5 text-center">
                            Disclaimer:  บ่ใช่ Official เด้อเเค่ทำให้มีดูดีขึ้นเเล้วค้นหาง่ายขึ้นหน่อย
                        </div>
                    </div>            
                </div>
            </div>

            <div className="container mx-auto -mt-8 pb-20 relative z-10">
                <div className="mx-3">
                    {/* Box */}
                    <div className="bg-white flex flex-col rounded-2xl p-8 bg-opacity-50 backdrop-blur-md shadow-2xl">
                        <div className="relative w-full text-[#787878]">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <SearchIcon color="#ffb2a0" />
                            </div>
                            <input type="text" className="bg-[#f3f6fb] bg-transparent flex h-12 rounded-xl shadow-md border border-[#ffc3b5] border-input px-3 outline-none pl-12 pr-4 py-4 text-lg w-full" placeholder="Search by subject code, name, year, or exam type..." />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="flex flex-col relative">
                                <div className="text-sm font-medium text-[#6c6c6c] mb-2">Year</div>
                                <div className="flex flex-row items-center hover:bg-[#ffdfd5] active:bg-[#fcd2c5] duration-300 text-[#787878] bg-transparent h-10 rounded-xl shadow-md border border-[#ffc3b5] border-input px-3 outline-none py-4 text-lg w-full cursor-pointer">
                                    <div className="grow text-start text-sm px-1">All Years</div>
                                    <ChevronDown size={20} color="#ffb2a0" />
                                </div>
                                <div hidden className="absolute border border-[#ffc3b5] rounded-xl w-full left-0 top-20 bg-[#fff] backdrop-blur-md shadow-md bg-opacity-80 p-1">
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center">
                                        <div className="w-5">
                                            <Check size={20} />
                                        </div>
                                        <div className="ml-2">All Years</div>
                                    </div>
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center">
                                        <div className="w-5">
                                            <Check size={20} />
                                        </div>
                                        <div className="ml-2">Final</div>
                                    </div>
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center">
                                        <div className="w-5">
                                            <Check size={20} />
                                        </div>  
                                        <div className="ml-2">Mid-Term</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col relative">
                                <div className="text-sm font-medium text-[#6c6c6c] mb-2">Semester</div>
                                <div className="flex flex-row items-center hover:bg-[#ffdfd5] active:bg-[#fcd2c5] duration-300 text-[#787878] bg-transparent h-10 rounded-xl shadow-md border border-[#ffc3b5] border-input px-3 outline-none py-4 text-lg w-full cursor-pointer">
                                    <div className="grow text-start text-sm px-1">All Semesters</div>
                                    <ChevronDown size={20} color="#ffb2a0" />
                                </div>
                                <div hidden className="absolute border border-[#ffc3b5] rounded-xl w-full left-0 top-20 bg-[#fff] backdrop-blur-md shadow-md bg-opacity-80 p-1">
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center">
                                        <div className="w-5">
                                            <Check size={20} />
                                        </div>
                                        <div className="ml-2">All Semesters</div>
                                    </div>
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center">
                                        <div className="w-5">
                                            <Check size={20} />
                                        </div>
                                        <div className="ml-2">Final</div>
                                    </div>
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center">
                                        <div className="w-5">
                                            <Check size={20} />
                                        </div>  
                                        <div className="ml-2">Mid-Term</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col relative">
                                <div className="text-sm font-medium text-[#6c6c6c] mb-2">Exam Type</div>
                                <div className="flex flex-row items-center hover:bg-[#ffdfd5] active:bg-[#fcd2c5] duration-300 text-[#787878] bg-transparent h-10 rounded-xl shadow-md border border-[#ffc3b5] border-input px-3 outline-none py-4 text-lg w-full cursor-pointer">
                                    <div className="grow text-start text-sm px-1">All Exam Types</div>
                                    <ChevronDown size={20} color="#ffb2a0" />
                                </div>
                                <div hidden className="absolute border border-[#ffc3b5] rounded-xl w-full left-0 top-20 bg-[#fff] backdrop-blur-md shadow-md bg-opacity-80 p-1">
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center">
                                        <div className="w-5">
                                            <Check size={20} />
                                        </div>
                                        <div className="ml-2">All Exam Types</div>
                                    </div>
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center">
                                        <div className="w-5">
                                            <Check size={20} />
                                        </div>
                                        <div className="ml-2">Final</div>
                                    </div>
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center">
                                        <div className="w-5">
                                            <Check size={20} />
                                        </div>  
                                        <div className="ml-2">Mid-Term</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-3 mt-8">
                    <div className="flex flex-row items-center gap-2">
                        <SearchIcon color="#ffb2a0" strokeWidth={2} size={25} />
                        <div className="text-black font-bold text-2xl">Search Results</div>
                        <div className="text-[#ff5f25] font-medium bg-[#ff9e70]/20 rounded-2xl px-3 py-1 text-sm">{pepData.length} papers</div>
                    </div>
                </div>
                <div className="mx-3 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {pepData.map((pep: PepSpecs) => (
                            <div className="bg-white shadow-sm rounded-xl p-6 hover:scale-105 hover:shadow-xl duration-150">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row items-center">
                                        <BookOpen color="#ff5f25" strokeWidth={2} size={18} />
                                        <div className="ml-2 font-mono text-sm font-semibold text-[#ff5517]">{pep.subjectCode}</div>
                                    </div>
                                    <div className="text-[#fff] font-semibold bg-[#ffbb00] rounded-2xl px-3 py-1 text-xs">{pep.examType}</div>
                                </div>
                                <div className="mt-3 grid grid-cols-4">
                                    <div className="col-span-3 text-black font-semibold text-lg leading-tight line-clamp-2">{pep.subjectName}</div>
                                </div>
                                <div className="mt-5 flex flex-row justify-between items-center">
                                    <div className="flex flex-row items-center">
                                        <Calendar strokeWidth={2} size={16} color="#000000" />
                                        <div className="ml-1 font-light text-[#000000] text-sm">Year {pep.year}</div>
                                        <FileText strokeWidth={2} size={16} color="#000000" className="ml-4" />
                                        <div className="ml-1 font-light text-[#000000] text-sm">Semester {pep.semester}</div>
                                    </div>
                                    <button className="flex flex-row items-center bg-gradient-to-br from-[#f7613b] to-[#f5aa2a] py-2 px-3 rounded-xl hover:scale-105 hover:shadow-xl active:scale-100 duration-150">
                                        <Download color="#fff" strokeWidth={2} size={16} />
                                        <div className="ml-2 text-sm font-semibold">Download</div>
                                    </button>                              
                                </div>
                                <div className="mt-3 w-full h-[2px] bg-[#d5d5d5] rounded-xl"></div>
                                <div className="mt-3 text-[#5f5f5f] text-xs">Call Number: {pep.callNumber}</div>     
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mx-3 mt-10">
                    <div className="flex flex-row justify-center gap-1 items-center">
                        <button className="rounded-full bg-gradient-to-br from-[#f7613b] to-[#f5aa2a] backdrop-blur-md shadow-xl w-10 h-10 items-center flex flex-row justify-center text-white">
                            <ChevronLeft strokeWidth={2} size={35} color="#ffffff" />
                        </button>

                        <div className="rounded-full bg-none w-10 h-10 items-center flex flex-row justify-center text-black font-bold text-xl">1</div>
                        <div className="rounded-full bg-none w-10 h-10 items-center flex flex-row justify-center text-black font-bold text-xl">2</div>
                        <div className="rounded-full bg-none w-10 h-10 items-center flex flex-row justify-center text-black font-bold text-xl">3</div>
                        <div className="rounded-full bg-none w-10 h-10 items-center flex flex-row justify-center text-black font-bold text-xl">4</div>
                        <div className="rounded-full bg-white/90 backdrop-blur-md shadow-xl w-10 h-10 items-center flex flex-row justify-center text-black font-bold text-xl">5</div>
                        <div className="rounded-full bg-none w-10 h-10 items-center flex flex-row justify-center text-black font-bold text-xl">6</div>
                        <div className="rounded-full bg-none w-10 h-10 items-center flex flex-row justify-center text-black font-bold text-xl">7</div>
                        <div className="rounded-full bg-none w-10 h-10 items-center flex flex-row justify-center text-black font-bold text-xl">8</div>
                        <div className="rounded-full bg-none w-10 h-10 items-center flex flex-row justify-center text-black font-bold text-xl">9</div>

                        <button className="rounded-full bg-gradient-to-br from-[#f7613b] to-[#f5aa2a] backdrop-blur-md shadow-xl w-10 h-10 items-center flex flex-row justify-center text-white">
                            <ChevronRight strokeWidth={2} size={35} color="#ffffff" />
                        </button>
                    </div>  
                </div>
            </div>
        </>
    );
}