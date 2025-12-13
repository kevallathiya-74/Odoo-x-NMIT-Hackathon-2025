import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

/**
 * Toast Notification Component
 * Shows user-friendly success, error, warning, and info messages
 */
const Toast = ({ type = 'info', message, onClose }) => {
    const icons = {
        success: <FaCheckCircle />,
        error: <FaTimesCircle />,
        warning: <FaExclamationCircle />,
        info: <FaInfoCircle />
    };

    const styles = {
        success: {
            background: '#D1FAE5',
            color: '#065F46',
            borderColor: '#059669'
        },
        error: {
            background: '#FEE2E2',
            color: '#991B1B',
            borderColor: '#DC2626'
        },
        warning: {
            background: '#FEF3C7',
            color: '#92400E',
            borderColor: '#F59E0B'
        },
        info: {
            background: '#DBEAFE',
            color: '#1E40AF',
            borderColor: '#3B82F6'
        }
    };

    return (
        <div
            className="toast-notification"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
                maxWidth: '400px',
                padding: '16px 20px',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'slideIn 0.3s ease-out',
                ...styles[type]
            }}
        >
            <span style={{ fontSize: '20px' }}>{icons[type]}</span>
            <p style={{ margin: 0, flex: 1, fontSize: '14px', fontWeight: '500' }}>
                {message}
            </p>
            {onClose && (
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px',
                        opacity: 0.7,
                        color: 'inherit'
                    }}
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default Toast;
