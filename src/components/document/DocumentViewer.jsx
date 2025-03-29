'use client';

import { useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import AnnotationRenderer from './AnnotationRenderer';

// Fix PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function DocumentViewer({
    pdfFile,
    currentPage,
    annotations,
    onDocumentLoadSuccess,
    onTextSelection,
    onCanvasClick,
    onSignaturePlace,
    tool
}) {
    const canvasRef = useRef(null);
    const pageRef = useRef(null);

    const handleMouseUp = () => {
        if (pageRef.current) {
            onTextSelection(null, pageRef.current);
        }
    };

    return (
        <div
            className="border border-gray-200 rounded-md overflow-auto"
            ref={canvasRef}
            onClick={onCanvasClick || onSignaturePlace}
            onMouseUp={handleMouseUp}
            style={{ cursor: tool ? 'crosshair' : 'default' }}
        >
            <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                className="mx-auto"
            >
                <Page
                    pageNumber={currentPage}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    scale={1.2}
                    className="relative"
                    inputRef={pageRef}
                >
                    {annotations && <AnnotationRenderer annotations={annotations} />}
                </Page>
            </Document>
        </div>
    );
}
