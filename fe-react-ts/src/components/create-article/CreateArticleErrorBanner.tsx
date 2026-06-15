import { AlertCircle } from "lucide-react";

interface CreateArticleErrorBannerProps {
  message: string;
}

export const CreateArticleErrorBanner: React.FC<CreateArticleErrorBannerProps> = ({
  message
}) => (
  <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-xl flex items-center gap-3 animate-[fadeIn_0.2s_ease]">
    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
    <p className="font-mono text-xs font-bold text-red-700 leading-tight">{message}</p>
  </div>
);
