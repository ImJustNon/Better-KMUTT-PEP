"use client";

import { Spinner } from "@chakra-ui/react";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


export default function PDFViewer({ pdfIsLoaded, pdfIsError, pdfTotalPages, pdfUrl, scale, onDocumentLoadSuccess, onDocumentLoadError }: { pdfIsLoaded: boolean; pdfIsError: string | null; pdfTotalPages: number; pdfUrl: string; scale: number; onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void; onDocumentLoadError: (error: Error) => void; }): React.JSX.Element {
    return (
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
    );
}