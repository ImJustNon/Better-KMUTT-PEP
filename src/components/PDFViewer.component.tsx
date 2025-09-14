"use client";

import { Spinner } from "@chakra-ui/react";
import { CloudAlert, ServerOff } from "lucide-react";
import { GlobalWorkerOptions } from "pdfjs-dist";
import React from "react";
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
                loading={<LoadingSpinner />}
                error={<ErrorMessage error={pdfIsError} />}
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

function LoadingSpinner(): React.JSX.Element {
    return (
        <div className={`flex justify-center items-center h-[800px]`}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='#f7613b'
                size="xl"
            />
        </div>
    );
}

function ErrorMessage({ error }: { error: string | null }): React.JSX.Element {
    return (
        <div className={`flex flex-col justify-center items-center h-[800px]`}>
            <CloudAlert size={100} className="text-gray-500" />
            <div className="mt-4 text-gray-500 font-bold font-mono text-center">500 Internal Server Error</div>
            {/* <div className="mt-2 text-gray-500 font-mono text-center text-[10px]">{error}</div> */}
        </div>
    );
}