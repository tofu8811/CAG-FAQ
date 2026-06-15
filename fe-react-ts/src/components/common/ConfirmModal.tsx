import { AlertCircle } from "lucide-react";

interface ConfirmModalProps {
    open: boolean;
    title: string;
    description: string;
    confirmText: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    title,
    description,
    confirmText,
    onCancel,
    onConfirm
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-[fadeIn0_0.2s_ease]">
            <div className="bg-white border border-slate-200/90 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-[scaleIn_0.2s_ease]">
                <div className="flex items-center gap-3 text-red-600 mb-4 border-b border-slate-100 pb-3">
                    <AlertCircle className="w-6 h-6 shrink-0" />
                    <h3 className="font-sans text-base font-extrabold text-slate-900">{title}</h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                    {description}
                </p>

                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 font-mono text-xs font-bold rounded-lg transition-all"
                    >
                        CANCEL
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white font-mono text-xs font-bold rounded-lg hover:bg-red-500 transition-all shadow-md active:scale-95"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};