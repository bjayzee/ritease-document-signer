'use client';

import { useRef, useEffect, useState } from 'react';

export default function SignatureModal({ onSave, onCancel }) {
    const [signature, setSignature] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';

        let drawing = false;
        let lastX = 0;
        let lastY = 0;

        const handleMouseDown = (e) => {
            drawing = true;
            const rect = canvas.getBoundingClientRect();
            lastX = e.clientX - rect.left;
            lastY = e.clientY - rect.top;
        };

        const handleMouseMove = (e) => {
            if (!drawing) return;

            const rect = canvas.getBoundingClientRect();
            const currX = e.clientX - rect.left;
            const currY = e.clientY - rect.top;

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(currX, currY);
            ctx.stroke();

            lastX = currX;
            lastY = currY;
        };

        const handleMouseUp = () => {
            if (drawing) {
                drawing = false;
                setSignature(canvas.toDataURL());
            }
        };

        const handleMouseLeave = () => {
            drawing = false;
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const resetSignature = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setSignature(null);
        }
    };

    return (
        <div className="fixed inset-0 text-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-medium mb-4">Draw your signature</h3>
                <div className="border border-gray-300 rounded-md mb-4">
                    <canvas
                        ref={canvasRef}
                        width={500}
                        height={200}
                        className="w-full"
                    ></canvas>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={resetSignature}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => signature && onSave(signature)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={!signature}
                    >
                        Use Signature
                    </button>
                </div>
            </div>
        </div>
    );
}