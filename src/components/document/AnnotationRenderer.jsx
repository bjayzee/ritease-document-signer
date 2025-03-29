'use client';

import { FaComment } from 'react-icons/fa';

export default function AnnotationRenderer({ annotations }) {
    return (
        <>
            {annotations.map((anno, index) => {
                if (anno.type === 'highlight') {
                    return (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                left: anno.x,
                                top: anno.y,
                                width: anno.width,
                                height: anno.height,
                                backgroundColor: anno.color,
                                opacity: 0.5,
                                pointerEvents: 'none'
                            }}
                        />
                    );
                } else if (anno.type === 'underline') {
                    return (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                left: anno.x,
                                top: anno.y + anno.height,
                                width: anno.width,
                                height: '2px',
                                backgroundColor: anno.color,
                                pointerEvents: 'none'
                            }}
                        />
                    );
                } else if (anno.type === 'comment') {
                    return (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                left: anno.x,
                                top: anno.y,
                                zIndex: 10
                            }}
                            className="group relative"
                        >
                            <div className="bg-yellow-300 rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                <FaComment />
                            </div>
                            <div className="hidden group-hover:block absolute left-7 top-0 bg-white shadow-md p-2 rounded-md w-64 text-sm">
                                {anno.text}
                            </div>
                        </div>
                    );
                } else if (anno.type === 'signature') {
                    return (
                        <img
                            key={index}
                            src={anno.image}
                            style={{
                                position: 'absolute',
                                left: anno.x,
                                top: anno.y,
                                width: '150px',
                                height: '50px',
                                pointerEvents: 'none'
                            }}
                            alt="Signature"
                        />
                    );
                }
                return null;
            })}
        </>
    );
}