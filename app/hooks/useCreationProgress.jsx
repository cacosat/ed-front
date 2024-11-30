import { useState, useEffect } from 'react';
import { DeckProgressManager } from '@/lib/deckProgress';

export default function useCreationProgress (deckId) {
    // manages SSE connections and updates
    const [progress, setProgress ] = useState(0);
    const [error, setError] = useState(null);
}