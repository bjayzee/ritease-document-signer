import { PDFDocument } from 'pdf-lib';


export async function exportAnnotatedPDF(pdfFile, annotations) {
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfFile);
    const pages = pdfDoc.getPages();

    // Process each annotation by page
    for (const annotation of annotations) {
        const page = pages[annotation.page - 1];

        if (annotation.type === 'highlight' || annotation.type === 'underline') {
            const { width, height, x, y, color } = annotation;

            // Convert hex color to RGB
            const r = parseInt(color.slice(1, 3), 16) / 255;
            const g = parseInt(color.slice(3, 5), 16) / 255;
            const b = parseInt(color.slice(5, 7), 16) / 255;

            if (annotation.type === 'highlight') {
                page.drawRectangle({
                    x,
                    y: page.getHeight() - y - height, // PDF coordinates are from bottom-left
                    width,
                    height,
                    color: { r, g, b, opacity: 0.5 },
                });
            } else {
                page.drawLine({
                    start: { x, y: page.getHeight() - y },
                    end: { x: x + width, y: page.getHeight() - y },
                    thickness: 2,
                    color: { r, g, b },
                });
            }
        } else if (annotation.type === 'comment') {
            page.drawText(annotation.text, {
                x: annotation.x,
                y: page.getHeight() - annotation.y,
                size: 12,
                color: { r: 1, g: 0, b: 0 },
            });

            // Draw a comment icon
            page.drawRectangle({
                x: annotation.x - 20,
                y: page.getHeight() - annotation.y - 10,
                width: 20,
                height: 20,
                color: { r: 1, g: 1, b: 0, opacity: 0.8 },
            });
        } else if (annotation.type === 'signature') {
            const signatureImage = await fetch(annotation.image);
            const signatureBytes = await signatureImage.arrayBuffer();
            const signatureImg = await pdfDoc.embedPng(signatureBytes);

            page.drawImage(signatureImg, {
                x: annotation.x,
                y: page.getHeight() - annotation.y - 50, 
                width: 150,
                height: 50,
            });
        }
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
}


export function downloadPDF(blob, filename = 'annotated_document.pdf') {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}


export function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}


export function isPdfFile(file) {
    return file && file.type === 'application/pdf';
}