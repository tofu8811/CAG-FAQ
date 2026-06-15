import { Bookmark } from "lucide-react";

export const SavedEmptyState = () => (
  <div className="text-center py-24 bg-white border-2 border-dashed border-slate-300 rounded-2xl max-w-lg mx-auto shadow-sm p-8">
    <Bookmark className="w-16 h-16 text-slate-300 mx-auto mb-4" />
    <h3 className="font-sans text-base font-bold text-slate-700">No saved articles found</h3>
    <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
      Click 'Save to Favorites' in any article reader View to cache technical logs for offline retrieval.
    </p>
  </div>
);
