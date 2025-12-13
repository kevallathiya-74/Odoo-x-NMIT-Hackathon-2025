import { useState, useCallback } from 'react';

/**
 * Custom hook for managing toast notifications
 * Usage: const { showToast, ToastContainer } = useToast();
 */
export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((type, message, duration = 4000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message }]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts(prev => prev.filter(toast => toast.id !== id));
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const ToastContainer = () => (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
            {toasts.map((toast, index) => (
                <div
                    key={toast.id}
                    style={{
                        marginBottom: '10px',
                        animation: 'slideIn 0.3s ease-out'
                    }}
                >
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={() => removeToast(toast.id)}
                    />
                </div>
            ))}
        </div>
    );

    return { showToast, ToastContainer };
};

// Toast Component (inline for simplicity)
const Toast = ({ type, message, onClose }) => {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const styles = {
        success: { background: '#D1FAE5', color: '#065F46', borderLeft: '4px solid #059669' },
        error: { background: '#FEE2E2', color: '#991B1B', borderLeft: '4px solid #DC2626' },
        warning: { background: '#FEF3C7', color: '#92400E', borderLeft: '4px solid #F59E0B' },
        info: { background: '#DBEAFE', color: '#1E40AF', borderLeft: '4px solid #3B82F6' }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                padding: '16px 20px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                ...styles[type]
            }}
        >
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{icons[type]}</span>
            <p style={{ margin: 0, flex: 1, fontSize: '14px', fontWeight: '500' }}>{message}</p>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '20px',
                    opacity: 0.7,
                    color: 'inherit',
                    padding: '0 4px'
                }}
            >
                ×
            </button>
        </div>
    );
};
