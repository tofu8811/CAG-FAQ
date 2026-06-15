import React from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    copied: boolean;
    onCopyCode: () => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ copied, onCopyCode }) => {
    return (
        <>
            <div className="my-6 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative shadow-md group">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>

                <div className="flex justify-between items-center bg-slate-800/60 px-5 py-3 border-b border-slate-800">
                    <span className="font-mono text-[11px] font-bold text-slate-400">SRC/OPTIMIZER/SPARSE_KERNEL.PY</span>
                    <button
                        onClick={onCopyCode}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                        title="Copy Code"
                    >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>

                <pre className="font-mono text-[12.5px] text-slate-300 p-5 overflow-x-auto leading-relaxed scrollbar-thin">
                    <code>
                        Quăng code vô đây
                    </code>
                </pre>
            </div>

        </>
    )
}