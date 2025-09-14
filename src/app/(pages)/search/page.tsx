"use client"

import { Book, BookOpen, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, Download, FileText, GraduationCap, SearchCheck, SearchIcon, X,  } from "lucide-react";
import logo from "../../../assets/logo.svg";
import Image from "next/image";
// import { ButtonGroup, createListCollection, IconButton, Pagination, Portal, Select } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { PepSpecs } from "@/utils/DataSearch";
import { LocalStorage } from "@/utils/LocalStorage";
import { useRouter, useSearchParams } from "next/navigation";
import PDFReaderDrawerComponent from "@/components/PDFReaderDrawer.component";
import { useDisclosure } from "@chakra-ui/react";


export default function Search(): React.JSX.Element {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get('p');

    const [pepData, setPepData] = useState<PepSpecs[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [pepTotalFound, setPepTotalFound] = useState<string>("");

    const [pagination, setPagination] = useState<{
        pageOrder: string[];
        pageMax: number;
        pageMin: number;
    }>({
        pageOrder: [],
        pageMax: 0,
        pageMin: 1
    });

    const [openSelector, setOpenSelector] = useState<{
        year: boolean;
        semester: boolean;
        examType: boolean;
    }>({
        year: false,
        semester: false,
        examType: false
    });
    const [selectorMenuList, setSelectorMenuList] = useState<{
        years: string[];
        semesters: string[];
        examTypes: string[];
    }>({
        years: [],
        semesters: [],
        examTypes: []
    });
    const [selectedValues, setSelectedValues] = useState<{
        year: string | null;
        semester: string | null;
        examType: string | null;
    }>({
        year: null,
        semester: null,
        examType: null
    });


    async function fetchData(): Promise<void> {
        const response = await axios.post("/api/v1/pep/search",{
            query: searchQuery,
            year: selectedValues.year,
            semester: selectedValues.semester,
            examType: selectedValues.examType,
            page: (parseInt(page || "1") - 1).toString()
        });
        setPepData(response.data.data);
        setPepTotalFound(response.data.total);
    };

    useEffect(() =>{
        fetchData();
    }, [page, selectedValues.year, selectedValues.semester, selectedValues.examType]);

    useEffect(() => {
        (async() => {
            const response = await axios.post("/api/v1/pep/selector");
            setSelectorMenuList(response.data.data);
        })();
    }, []);

    useEffect(() => {
        const currentPage = parseInt(page || "1");
        const totalPages = Math.max(1, Math.ceil(parseInt(pepTotalFound || "0") / 12));
        let pagelist: string[] = [];
        
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 4);
        if (end - start < 4) {
            start = Math.max(1, end - 4);
        }
        for (let i = start; i <= end; i++) {
            pagelist.push(i.toString());
        }
        setPagination(prev => ({
            ...prev,
            pageOrder: pagelist,
            pageMax: totalPages,
            pageMin: 1
        }));
    }, [pepData, page, pepTotalFound]);

    function changePages(direction: "next" | "prev" | number): void {
        const currentPage = parseInt(page || "1");
        let newPage = currentPage;
        if (direction === "next") {
            newPage = Math.max(1, currentPage - 1);
        } else if (direction === "prev") {
            newPage = Math.min(pagination.pageMax, currentPage + 1);
        } else if (typeof direction === "number") {
            newPage = direction;
        }
        if (newPage !== currentPage && newPage >= 1 && newPage <= pagination.pageMax) {
            router.push(`/search?p=${newPage}`, { scroll: false });
        }
    }

    const pdfReaderDrawerDisclosure = useDisclosure();
    const pdfReaderDrawerIsOpen = pdfReaderDrawerDisclosure.isOpen;
    const pdfReaderDrawerOnOpen = pdfReaderDrawerDisclosure.onOpen;
    const pdfReaderDrawerOnClose = pdfReaderDrawerDisclosure.onClose;

    const [pdfInfo, setPdfInfo] = useState<{ url: string; name: string }>({ url: "", name: "" });

    return(
        <>
            <div className="container mx-auto -mt-8 pb-20 relative z-10">
                <div className="mx-3">
                    {/* Box */}
                    <div className="bg-white flex flex-col rounded-2xl p-8 bg-opacity-50 backdrop-blur-md shadow-2xl">
                        <div className="relative w-full text-[#787878]">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <SearchIcon color="#ffb2a0" />
                            </div>
                            <input
                                type="text"
                                className="bg-[#f3f6fb] bg-transparent flex h-12 rounded-xl shadow-md border border-[#ffc3b5] border-input px-3 outline-none pl-12 pr-4 py-4 text-lg w-full"
                                placeholder="Search by subject code, name, year, or exam type..."
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        fetchData();
                                    }
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="flex flex-col relative">
                                <div className="text-sm font-medium text-[#6c6c6c] mb-2">Year</div>
                                <div className="flex flex-row items-center hover:bg-[#ffdfd5] active:bg-[#fcd2c5] duration-300 text-[#787878] bg-transparent h-10 rounded-xl shadow-md border border-[#ffc3b5] border-input px-3 outline-none py-4 text-lg w-full cursor-pointer" onClick={() => setOpenSelector({year: !openSelector.year, semester: false, examType: false})}>
                                    <div className="grow text-start text-sm px-1">{selectedValues.year === null ? "All Years" : selectedValues.year}</div>
                                    <ChevronDown strokeWidth={3} size={25} color="#ffb2a0" />
                                </div>
                                <div className={`${openSelector.year ? "scale-y-100 opacity-100" : "scale-y-0 opacity-1"} origin-top transform transition-transform ease-in-out duration-150 absolute border border-[#ffc3b5] rounded-xl w-full left-0 top-20 bg-[#fff] shadow-md p-1 z-30`}>
                                    
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center" onClick={() => setSelectedValues(prev => ({...prev, year: null}))}>
                                        <div className="w-5">
                                            <Check size={20} color="#ff5f25" className={`${selectedValues.year === null ? "opacity-100" : "opacity-0"}`} />
                                        </div>
                                        <div className="ml-2">All Years</div>
                                    </div>
                                    {selectorMenuList.years.map((year: string, i: number) => (
                                        <div key={i} className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center" onClick={() => setSelectedValues(prev => ({...prev, year: year}))}>
                                            <div className="w-5">
                                                <Check size={20} color="#ff5f25" className={`${selectedValues.year === year ? "opacity-100" : "opacity-0"}`} />
                                            </div>
                                            <div className="ml-2">{year}</div>
                                        </div>
                                    ))}  
                                    
                                </div>
                            </div>
                            <div className="flex flex-col relative">
                                <div className="text-sm font-medium text-[#6c6c6c] mb-2">Semester</div>
                                <div className="flex flex-row items-center hover:bg-[#ffdfd5] active:bg-[#fcd2c5] duration-300 text-[#787878] bg-transparent h-10 rounded-xl shadow-md border border-[#ffc3b5] border-input px-3 outline-none py-4 text-lg w-full cursor-pointer" onClick={() => setOpenSelector({year: false, semester: !openSelector.semester, examType: false})}>
                                    <div className="grow text-start text-sm px-1">{selectedValues.semester === null ? "All Semesters" : selectedValues.semester}</div>
                                    <ChevronDown strokeWidth={3} size={25} color="#ffb2a0" />
                                </div>
                                <div className={`${openSelector.semester ? "scale-y-100 opacity-100" : "scale-y-0 opacity-1"} origin-top transform transition-transform ease-in-out duration-150 absolute border border-[#ffc3b5] rounded-xl w-full left-0 top-20 bg-[#fff] shadow-md p-1 z-20`}>
                                    
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center" onClick={() => setSelectedValues(prev => ({...prev, semester: null}))}>
                                        <div className="w-5">
                                            <Check size={20} color="#ff5f25" className={`${selectedValues.semester === null ? "opacity-100" : "opacity-0"}`} />
                                        </div>
                                        <div className="ml-2">All Semesters</div>
                                    </div>
                                    {selectorMenuList.semesters.map((semester: string, i: number) => (
                                        <div key={i} className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center" onClick={() => setSelectedValues(prev => ({...prev, semester: semester}))}>
                                            <div className="w-5">
                                                <Check size={20} color="#ff5f25" className={`${selectedValues.semester === semester ? "opacity-100" : "opacity-0"}`} />
                                            </div>
                                            <div className="ml-2">{semester}</div>
                                        </div>
                                    ))}  

                                </div>
                            </div>
                            <div className="flex flex-col relative">
                                <div className="text-sm font-medium text-[#6c6c6c] mb-2">Exam Type</div>
                                <div className="flex flex-row items-center hover:bg-[#ffdfd5] active:bg-[#fcd2c5] duration-300 text-[#787878] bg-transparent h-10 rounded-xl shadow-md border border-[#ffc3b5] border-input px-3 outline-none py-4 text-lg w-full cursor-pointer" onClick={() => setOpenSelector({year: false, semester: false, examType: !openSelector.examType})}>
                                    <div className="grow text-start text-sm px-1">{selectedValues.examType === null ? "All Exam Types" : selectedValues.examType}</div>
                                    <ChevronDown strokeWidth={3} size={25} color="#ffb2a0" />
                                </div>
                                <div className={`${openSelector.examType ? "scale-y-100 opacity-100" : "scale-y-0 opacity-1"} origin-top transform transition-transform ease-in-out duration-150 absolute border border-[#ffc3b5] rounded-xl w-full left-0 top-20 bg-[#fff] shadow-md p-1 z-10`}>
                                    
                                    <div className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center" onClick={() => setSelectedValues(prev => ({...prev, examType: null}))}>
                                        <div className="w-5">
                                            <Check size={20} color="#ff5f25" className={`${selectedValues.examType === null ? "opacity-100" : "opacity-0"}`} />
                                        </div>
                                        <div className="ml-2">All Exam Types</div>
                                    </div>
                                    {selectorMenuList.examTypes.map((examType: string, i: number) => (
                                        <div key={i} className="px-3 py-2 text-sm text-[#6c6c6c] hover:bg-[#ffdfd5] active:bg-[#fcd2c5] rounded-xl cursor-pointer duration-300 flex flex-row items-center" onClick={() => setSelectedValues(prev => ({...prev, examType: examType}))}>
                                            <div className="w-5">
                                                <Check size={20} color="#ff5f25" className={`${selectedValues.examType === examType ? "opacity-100" : "opacity-0"}`} />
                                            </div>
                                            <div className="ml-2">{examType}</div>
                                        </div>
                                    ))}    

                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-row items-center">
                            <div className={`${Object.values(selectedValues).some(value => value !== null) ? "opacity-100" : "opacity-0"} duration-150 text-sm font-light text-[#6c6c6c] py-1`}>Active filters: </div>
                            <div hidden={!selectedValues.year} className={`ml-2 text-xs font-semibold px-[10px] py-1 text-[#434343] bg-[#ffcaa1] rounded-full flex flex-row items-center`}>
                                <div className="mr-2">Year: {selectedValues.year}</div>
                                <X size={15} className="cursor-pointer" />
                            </div>
                            <div hidden={!selectedValues.semester} className={`ml-2 text-xs font-semibold px-[10px] py-1 text-[#434343] bg-[#ffcaa1] rounded-full flex flex-row items-center`}>
                                <div className="mr-2">Semester: {selectedValues.semester}</div>
                                <X size={15} className="cursor-pointer" />
                            </div>
                            <div hidden={!selectedValues.examType} className={`ml-2 text-xs font-semibold px-[10px] py-1 text-[#434343] bg-[#ffcaa1] rounded-full flex flex-row items-center`}>
                                <div className="mr-2">Type: {selectedValues.examType}</div>
                                <X size={15} className="cursor-pointer" />
                            </div>
                            <div hidden={!Object.values(selectedValues).some(value => value !== null)} className="ml-4 underline text-[#ff7138] text-md cursor-pointer" onClick={() => setSelectedValues({ year: null, semester: null, examType: null })}>Clear all</div>
                        </div>
                    </div>
                </div>
                <div className="mx-3 mt-8">
                    <div className="flex flex-row items-center gap-2">
                        <SearchIcon color="#ffb2a0" strokeWidth={2} size={25} />
                        <div className="text-black font-bold text-2xl">Search Results</div>
                        <div className="text-[#ff5f25] font-medium bg-[#ff9e70]/20 rounded-2xl px-3 py-1 text-sm">{pepTotalFound} papers</div>
                    </div>
                </div>
                <div className="mx-3 mt-8">

                    {pepData.length === 0 ? (
                        <div className="bg-white flex flex-col items-center w-full rounded-xl shadow-md py-10 px-5 text-center">
                            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No exam papers found
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Try adjusting your search terms or filters to find what you're looking for.
                            </p>
                            {(selectedValues.examType || selectedValues.year || selectedValues.semester) && (
                                <button
                                    onClick={() => setSelectedValues({ year: null, semester: null, examType: null })}
                                    className="underline text-[#ff7138] text-md cursor-pointer"
                                >
                                Clear all filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {pepData.map((pep: PepSpecs, i: number) => (
                                <div key={i} className="bg-white shadow-sm rounded-xl p-6 hover:scale-x-105 hover:shadow-xl duration-300 animate-slide-in">
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
                                        <button className="flex flex-row items-center bg-gradient-to-br from-[#f7613b] to-[#f5aa2a] py-2 px-3 rounded-xl hover:scale-105 hover:shadow-xl active:scale-100 duration-150" onClick={() => {setPdfInfo({ url: `/api/v1/pep/download?url=${pep.link}&name=${pep.subjectName}`, name: pep.subjectName }); pdfReaderDrawerOnOpen();}}>
                                            <Download color="#fff" strokeWidth={2} size={16} />
                                            <div className="ml-2 text-sm font-semibold text-white">Download</div>
                                        </button>                              
                                    </div>
                                    <div className="mt-3 w-full h-[2px] bg-[#d5d5d5] rounded-xl"></div>
                                    <div className="mt-3 text-[#5f5f5f] text-xs">Call Number: {pep.callNumber}</div>     
                                </div>
                            ))}
                        </div> 
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="mx-3 mt-16">
                    <div className="flex flex-row justify-center gap-1 items-center">
                        <button disabled={parseInt(page || "1") <= 1} className="rounded-full bg-gradient-to-br from-[#f7613b] to-[#f5aa2a] backdrop-blur-md shadow-xl w-10 h-10 items-center flex flex-row justify-center text-white " onClick={() => changePages("next")} >
                            <ChevronLeft strokeWidth={2} size={35} color="#ffffff" />
                        </button>
                        {pagination.pageOrder.map((p, idx) => (
                            <button
                                key={p}
                                onClick={() => changePages(parseInt(p))}
                                className={`rounded-full w-10 h-10 items-center flex flex-row justify-center font-bold text-xl ${parseInt(p) === parseInt(page || "1") ? "bg-white/90 backdrop-blur-md shadow-xl text-black" : "bg-none text-black"}`}
                                disabled={parseInt(p) === parseInt(page || "1")}
                            >
                                {p}
                            </button>
                        ))}
                        <button disabled={parseInt(page || "1") >= pagination.pageMax} className="rounded-full bg-gradient-to-br from-[#f7613b] to-[#f5aa2a] backdrop-blur-md shadow-xl w-10 h-10 items-center flex flex-row justify-center text-white" onClick={() => changePages("prev")}>
                            <ChevronRight strokeWidth={2} size={35} color="#ffffff" />
                        </button>
                    </div>  
                </div>

            </div>

            <PDFReaderDrawerComponent isOpen={pdfReaderDrawerIsOpen} onOpen={pdfReaderDrawerOnOpen} onClose={pdfReaderDrawerOnClose} pdfUrl={pdfInfo.url} pdfName={pdfInfo.name} />
        </>
    );
}