import React from "react";
import { Mail, CheckCircle } from "lucide-react";

interface NewsletterCardProps {
    emailSub: string;
    subSuccess: boolean;
    setEmailSub: (value: string) => void;
    onSubscribe: (e: React.FormEvent) => void;
}

export const NewsletterCard: React.FC<NewsletterCardProps> = ({
    emailSub,
    subSuccess,
    setEmailSub,
    onSubscribe
}) => {
    return (
        <>
            <div className="bg-slate-900 text-white rounded-2xl p-6.5 relative overflow-hidden shadow-md">
                {/* Background design accents */}
                <div className="absolute top-0 right-0 p-3 opacity-5 select-none font-mono text-9xl">
                    &lt;/&gt;
                </div>

                <h3 className="font-sans text-lg font-bold mb-1.5">Join the Lab</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    Get weekly deep-dives into raw engineering documentation, container pipelines, and systems design whitepapers.
                </p>

                {subSuccess ? (
                    <div className="p-4 bg-blue-950/80 border border-blue-500/30 rounded-xl flex items-center gap-3 animate-[fadeIn_0.3s_ease]">
                        <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-white">Subscription Verified</p>
                            <p className="text-[10px] text-blue-300">Welcome to the technical circle.</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubscribe} className="space-y-3.5">
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                            <input
                                type="email"
                                placeholder="dev@domain.com"
                                value={emailSub}
                                onChange={(e) => setEmailSub(e.target.value)}
                                required
                                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-mono text-xs font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors shadow-lg active:scale-[0.98]"
                        >
                            SUBSCRIBE(USER)
                        </button>
                    </form>
                )}
            </div>

        </>
    );
}
