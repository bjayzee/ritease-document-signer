'use client';

export default function PageNavigation({ currentPage, numPages, onPrevPage, onNextPage }) {
    return (
        <div className="flex justify-center items-center mt-4 space-x-4">
            <button
                onClick={onPrevPage}
                disabled={currentPage <= 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {numPages}
            </span>
            <button
                onClick={onNextPage}
                disabled={currentPage >= numPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}