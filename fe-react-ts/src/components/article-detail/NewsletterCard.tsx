import React from "react";
import { CheckCircle } from "lucide-react";

interface ArticleNewsletterCardProps {
    emailSub: string;
    subSuccess: boolean;
    setEmailSub: (value: string) => void;
    onSubscribe: (e: React.FormEvent) => void;
}

export const ArticleNewsletterCard: React.FC<ArticleNewsletterCardProps> = ({
    emailSub,
    subSuccess,
    setEmailSub,
    onSubscribe
}) => {
    return (
        <>
            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-sans text-sm font-extrabold text-blue-800 mb-1">Weekly Lab Digests</h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-5">
                        Emerging architectures straight to your terminal. Zero spam.
                    </p>

                    {subSuccess ? (
                        <div className="p-3 bg-white border border-blue-200 rounded-xl flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-bold text-slate-800 font-mono">DIGEST_ACTIVE</span>
                        </div>
                    ) : (
                        <form onSubmit={onSubscribe} className="space-y-2.5">
                            <input
                                type="email"
                                placeholder="dev@null.com"
                                value={emailSub}
                                onChange={(e) => setEmailSub(e.target.value)}
                                required
                                className="w-full bg-white border border-slate-200 text-slate-800 text-xs px-3.5 py-2 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                            />
                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white font-mono text-xs font-bold py-2 hover:bg-slate-800 transition-colors rounded-lg"
                            >
                                SUBSCRIBE
                            </button>
                        </form>
                    )}
                </div>
            </div>

        </>
    )
}