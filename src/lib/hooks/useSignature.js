import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook to initialize and manage a signature pad
 * @param {boolean} isActive - Whether the signature pad is active
 * @returns {Object} Signature pad state and methods
 */
export default function useSignaturePad(isActive) {
    const canvasRef = useRef(null);
    const [signature, setSignature] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Initialize the signature pad
    useEffect(() => {
        if (!canvasRef.current || !isActive) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set up drawing properties
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        let lastX = 0;
        let lastY = 0;

        // Mouse event handlers
        const handleMouseDown = (e) => {
            setIsDrawing(true);
            const rect = canvas.getBoundingClientRect();
            lastX = e.clientX - rect.left;
            lastY = e.clientY - rect.top;
        };

        const handleMouseMove = (e) => {
            if (!isDrawing) return;

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
            if (isDrawing) {
                setIsDrawing(false);
                setSignature(canvas.toDataURL());
            }
        };

        // Touch event handlers for mobile devices
        const handleTouchStart = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        };

        const handleTouchEnd = (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            canvas.dispatchEvent(mouseEvent);
        };

        // Add event listeners
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp);

        // Add touch event listeners
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);
        canvas.addEventListener('touchend', handleTouchEnd);

        // Clean up event listeners
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseleave', handleMouseUp);

            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isActive, canvasRef, isDrawing]);

    // Reset the signature pad
    const resetSignature = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setSignature(null);
        }
    };

    return {
        canvasRef,
        signature,
        isDrawing,
        resetSignature
    };
}