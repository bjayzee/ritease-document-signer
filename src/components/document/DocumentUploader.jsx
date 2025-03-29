'use client';

import { useRef, useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';

export default function DocumentUploader({ onFileUploaded }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const onFileChange = (event) => {
        const file = event.target.files[0];
        processFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        processFile(file);
    };

    const processFile = (file) => {
        if (file && file.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                onFileUploaded(fileReader.result);
            };
            fileReader.readAsArrayBuffer(file);
        } else {
            // Could pass an error message back to parent
            console.error('Please upload a valid PDF document');
        }
    };

    return (
        <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
                accept=".pdf"
            />
            <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
                Drag and drop a PDF file here, or click to select a file
            </p>
        </div>
    );
}