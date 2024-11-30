// Utilities / API (CRUD) to manage deck creation progress in localStorage
export const DeckProgressManager = {
    // initialize keys to use in storage
    DECK_KEY: 'deckId',
    DECK_STATUS: 'deckStatus',
    startGeneration(deckId) {
        // this refers to the DeckProgressManager object
        localStorage.setItem(this.DECK_KEY, deckId);
        this.updateStatus(deckId, {
            status: 'generating',
            progress: 0,
            currentModule: 'starting',
            timestamp: Date.now()
        });
    },
    updateStatus(deckId, status) {
        const statusData = JSON.stringify({
            deckId, 
            ...status
        });
        localStorage.setItem(this.DECK_STATUS, statusData);
    },
    getStatus() {
        const status = localStorage.getItem(this.DECK_STATUS)
        return status ? JSON.parse(status) : null;
    },
    getId() {
        return localStorage.getItem(this.DECK_KEY);
    },
    clearDeck() {
        localStorage.removeItem(this.DECK_KEY);
        localStorage.removeItem(this.DECK_STATUS);
    }
}