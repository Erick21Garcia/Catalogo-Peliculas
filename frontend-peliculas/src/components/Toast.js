import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const typeStyles = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
    };

    return (
        <div className={`fixed top-5 right-5 z-50`}>
            <div
                className={`${typeStyles[type]} text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-up`}
            >
                {message}
            </div>
        </div>
    );
};

export default Toast;
