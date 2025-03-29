'use client';

import { useState } from 'react';

export default function useAnnotations() {
    const [annotations, setAnnotations] = useState([]);

    const addAnnotation = (annotation) => {
        setAnnotations(prev => [...prev, annotation]);
    };

    const removeAnnotation = (index) => {
        setAnnotations(prev => prev.filter((_, i) => i !== index));
    };

    const clearAnnotations = () => {
        setAnnotations([]);
    };

    return {
        annotations,
        addAnnotation,
        removeAnnotation,
        clearAnnotations
    };
}