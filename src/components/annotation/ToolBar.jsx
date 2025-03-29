'use client';

import { FaHighlighter, FaUnderline, FaComment, FaSignature, FaFileDownload } from 'react-icons/fa';

export default function ToolBar({
    currentTool,
    setTool,
    toolColor,
    setToolColor,
    onExport,
    loading
}) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
                <button
                    onClick={() => setTool('highlight')}
                    className={`p-2 rounded-md ${currentTool === 'highlight' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    title="Highlight text"
                >
                    <FaHighlighter />
                </button>
                <button
                    onClick={() => setTool('underline')}
                    className={`p-2 rounded-md ${currentTool === 'underline' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    title="Underline text"
                >
                    <FaUnderline />
                </button>
                <button
                    onClick={() => setTool('comment')}
                    className={`p-2 rounded-md ${currentTool === 'comment' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    title="Add comment"
                >
                    <FaComment />
                </button>
                <button
                    onClick={() => setTool('signature')}
                    className={`p-2 rounded-md ${currentTool === 'signature' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    title="Add signature"
                >
                    <FaSignature />
                </button>

                {/* Color picker for highlight and underline */}
                {(currentTool === 'highlight' || currentTool === 'underline') && (
                    <input
                        type="color"
                        value={toolColor}
                        onChange={(e) => setToolColor(e.target.value)}
                        className="h-8 w-8 rounded cursor-pointer"
                    />
                )}
            </div>

            {/* Export button */}
            <button
                onClick={onExport}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                disabled={loading}
            >
                {loading ? 'Processing...' : (
                    <>
                        <FaFileDownload className="mr-2" /> Export PDF
                    </>
                )}
            </button>
        </div>
    );
}