interface ToastProps {
    message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] bg-slate-950 text-white px-5 py-3 rounded-lg shadow-xl font-mono text-xs border border-slate-800 flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{message}</span>
        </div>
    );
};