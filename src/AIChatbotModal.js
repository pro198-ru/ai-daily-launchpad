import React, { useState } from 'react';

function AIChatbotModal() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <>
            <button style={styles.openButton} onClick={toggleModal}>
                Open AI Chatbot
            </button>
            {isOpen && (
                <div style={styles.modalOverlay} onClick={toggleModal}>
                    <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button style={styles.closeButton} onClick={toggleModal}>
                            ×
                        </button>
                        <iframe
                            src="https://you.com/chat"
                            title="AI Chatbot"
                            style={styles.iframe}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

const styles = {
    openButton: {
        padding: '12px 24px',
        fontSize: 16,
        backgroundColor: '#4a90e2',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        marginTop: 20,
    },
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        position: 'relative',
        width: '90%',
        maxWidth: 600,
        height: '80vh',
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        overflow: 'hidden',
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 12,
        fontSize: 24,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none',
    },
};

export default AIChatbotModal;
