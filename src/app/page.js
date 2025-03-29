'use client';

import { useState } from 'react';
import DocumentUploader from '@/components/document/DocumentUploader';
import DocumentViewer from '@/components/document/DocumentViewer';
import ToolBar from '@/components/annotation/ToolBar';
import CommentModal from '@/components/annotation/CommentModal';
import SignatureModal from '@/components/annotation/SignatureModal';
import MessageToast from '@/components/annotation/MessageToast';
import useAnnotations from '@/lib/hooks/useAnnotations';
import PageNavigation from '@/components/document/PageNavigation';
import { exportPDF } from '@/lib/utils/exportPdf';

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tool, setTool] = useState(null);
  const [toolColor, setToolColor] = useState('#ffff00'); // Default yellow for highlight
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [comment, setComment] = useState('');
  const [commentPosition, setCommentPosition] = useState(null);
  const [signature, setSignature] = useState(null);

  const { 
    annotations, 
    addAnnotation, 
    clearAnnotations 
  } = useAnnotations();

  // Handle file upload success
  const handleFileUpload = (file) => {
    setPdfFile(file);
    clearAnnotations();
    setTool(null);
    showMessage('Document uploaded successfully', 'success');
  };
  
  // PDF document loaded handler
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  // Display a message to the user
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };
  
  // Handle text selection for highlight and underline
  const handleTextSelection = (e, pageElement) => {
    if (!tool || (tool !== 'highlight' && tool !== 'underline')) return;
    
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    if (!pageElement) return;
    
    const pageRect = pageElement.getBoundingClientRect();
    
    const annotation = {
      type: tool,
      x: rect.left - pageRect.left,
      y: rect.top - pageRect.top,
      width: rect.width,
      height: rect.height,
      color: toolColor,
      page: currentPage,
      text: selection.toString()
    };
    
    addAnnotation(annotation);
    selection.removeAllRanges();
  };
  
  // Handle canvas click for comments
  const handleCanvasClick = (e) => {
    if (tool === 'comment') {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setCommentPosition({ x, y, page: currentPage });
    }
  };
  
  // Add comment to annotations
  const addComment = () => {
    if (!comment || !commentPosition) return;
    
    addAnnotation({
      type: 'comment',
      x: commentPosition.x,
      y: commentPosition.y,
      page: commentPosition.page,
      text: comment
    });
    
    setComment('');
    setCommentPosition(null);
    setTool(null);
  };
  
  // Add signature to annotations
  const addSignature = (e) => {
    if (!signature) return;
    
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    addAnnotation({
      type: 'signature',
      x,
      y,
      page: currentPage,
      image: signature
    });
    
    setSignature(null);
    setTool(null);
  };
  
  // Export the annotated PDF
  const handleExportPDF = async () => {
    if (!pdfFile) {
      showMessage('No document to export', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      await exportPDF(pdfFile, annotations);
      showMessage('Document exported successfully', 'success');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      showMessage('Error exporting document', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  // Change page handlers
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, numPages));
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Ritease PDF Document Signer</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {!pdfFile ? (
          <DocumentUploader onFileUploaded={handleFileUpload} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <ToolBar 
              currentTool={tool}
              setTool={setTool}
              toolColor={toolColor}
              setToolColor={setToolColor}
              onExport={handleExportPDF}
              loading={loading}
            />
            
            <DocumentViewer 
              pdfFile={pdfFile}
              currentPage={currentPage}
              annotations={annotations.filter(anno => anno.page === currentPage)}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              onTextSelection={handleTextSelection}
              onCanvasClick={tool === 'comment' ? handleCanvasClick : undefined}
              onSignaturePlace={tool === 'placing-signature' ? addSignature : undefined}
              tool={tool}
            />
            
            {numPages > 1 && (
              <PageNavigation 
                currentPage={currentPage}
                numPages={numPages}
                onPrevPage={goToPrevPage}
                onNextPage={goToNextPage}
              />
            )}
          </div>
        )}
        
        {/* Modals */}
        {tool === 'signature' && (
          <SignatureModal 
            onSave={(sig) => {
              setSignature(sig);
              setTool('placing-signature');
            }}
            onCancel={() => setTool(null)}
          />
        )}
        
        {commentPosition && (
          <CommentModal 
            comment={comment}
            setComment={setComment}
            onAdd={addComment}
            onCancel={() => setCommentPosition(null)}
          />
        )}
        
        {/* Toast message */}
        {message.text && (
          <MessageToast message={message} />
        )}
      </main>
    </div>
  );
}