"use client"

import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, RadioGroup, Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import { Download, Radio, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();


export default function PDFReaderDrawerComponent({isOpen, onOpen, onClose, pdfUrl, pdfName}: {isOpen: boolean, onOpen: () => void, onClose: () => void; pdfUrl: string; pdfName: string}): React.JSX.Element {
    

    const [pdfTotalPages, setPdfTotalPages] = useState<number>(0);
    const [pdfIsLoaded, setPdfIsLoaded] = useState<boolean>(false);
    const [pdfIsError, setPdfIsError] = useState<string | null>(null);
    const [scale, setScale] = useState<number>(1.0);

    // Detect phone/mobile screen and set scale
    useEffect(() => {
        function updateScale() {
            if (window.innerWidth <= 640) {
                setScale(0.6);
            } else {
                setScale(1.0);
            }
        }
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setPdfTotalPages(numPages);
        setPdfIsLoaded(true);
        setPdfIsError(null);
    }

    const onDocumentLoadError = (error: Error) => {
        setPdfIsLoaded(false);
        setPdfIsError(error.message);
        console.error("PDF loading error:", error);
    }


    return (
        <>
            <Drawer placement={scale === 1.0 ? "right" : "bottom"} onClose={onClose} isOpen={isOpen} size={"xl"}>
                <DrawerOverlay />
                <DrawerContent className="rounded-l-xl !p-0" padding={0} borderColor={"#ff5517"} borderLeftWidth={1} >
                    <DrawerBody className="rounded-l-xl flex flex-col !p-0 bg-[#fbf7f3]">

                        <div className="flex flex-row items-center justify-between w-full px-6 pt-5 pb-4 bg-gradient-to-br from-[#f7613b] to-[#f5aa2a] z-20 border-b border-gray-200 sticky top-0 shadow-md">
                            <div className="text-xl font-bold text-white mr-2 leading-tight line-clamp-1">{pdfName}</div>
                            <div className="flex flex-row items-center">
                                <Download size={25} strokeWidth={2} className="text-[#ffffff] mr-7 cursor-pointer hover:text-[#d0d0d0] duration-300" onClick={() => window.open(pdfUrl,"_blank")} />
                                <X size={30} strokeWidth={2} className="text-[#ffffff] cursor-pointer hover:text-[#d0d0d0] duration-300" onClick={onClose} />    
                            </div>
                        </div>


                        <div className={`${pdfIsLoaded ? "animate__animated animate__fadeIn" : ""} flex-1 overflow-y-auto w-full flex justify-center items-start py-6`}>
                            <Document
                                file={pdfUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={onDocumentLoadError}
                                className="w-full"
                                loading={
                                    <div className={`flex justify-center items-center h-[800px]`}>
                                        <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='#f7613b'
                                            size="xl"
                                        />
                                    </div>
                                }
                                error={pdfIsError || ""}
                            >

                                {[...Array(pdfTotalPages).keys()].map((_, i) => (
                                    <Page
                                        key={i}
                                        pageNumber={i + 1}
                                        scale={scale}
                                        className="shadow-lg w-fit mx-auto border border-border rounded-lg overflow-hidden bg-white mb-6"
                                    />
                                ))}
                            </Document>
                        </div>

                       
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}