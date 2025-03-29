'use client';

export default function MessageToast({ message }) {
    return (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white z-50`}>
            {message.text}
        </div>
    );
}