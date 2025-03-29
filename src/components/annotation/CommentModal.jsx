'use client';

export default function CommentModal({ comment, setComment, onAdd, onCancel }) {
    return (
        <div className="fixed inset-0  bg-opacity-75 flex items-center text-black justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-medium mb-4">Add a comment</h3>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
                    placeholder="Type your comment here..."
                ></textarea>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onAdd}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={!comment}
                    >
                        Add Comment
                    </button>
                </div>
            </div>
        </div>
    );
}