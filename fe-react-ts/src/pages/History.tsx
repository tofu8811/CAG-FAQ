import React, { useState } from "react";
import {
  Trash2, FolderMinus, RefreshCw
} from "lucide-react";
import { HistoryEntry, Article, Category } from "../types";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { HistoryTimeline } from "../components/history/HistoryTimeline";
import { useToast } from "../contexts/ToastContext";

interface HistoryProps {
  historyEntries: HistoryEntry[];
  categories: Category[];
  onRemoveEntry: (id: string) => void;
  onClearHistory: () => void;
  onRevisit: (article: Article) => void;
  onRetrieveOlder: () => void;
}

export const History: React.FC<HistoryProps> = ({
  historyEntries,
  categories,
  onRemoveEntry,
  onClearHistory,
  onRevisit,
  onRetrieveOlder
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { triggerToast } = useToast();

  const todayEntries = historyEntries.filter(entry => entry.dateGroup === "Today");
  const yesterdayEntries = historyEntries.filter(entry => entry.dateGroup === "Yesterday");

  const handleClearConfirm = () => {
    onClearHistory();
    setShowConfirmModal(false);
    triggerToast("Reading log buffers successfully purged from locale cache");
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 relative">

      {/* Toast Alert Popups */}

      {/* Structured Purge Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmModal
          open={showConfirmModal}
          title="Purge Cached Articles Log"
          description="Are you sure you want to write-delete the full active reading entries? This will delete trace metrics and cannot be undone."
          confirmText="CONFIRM_PURGE_ALL"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleClearConfirm}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-slate-200 pb-8">
        <div>
          <h1 className="font-sans text-3xl font-extrabold text-slate-900">Reading History</h1>
          <p className="font-mono text-xs font-bold text-slate-500 mt-2 tracking-wider">
            CACHED_ARTICLES_LOG // VERSION_1.0.4
          </p>
        </div>

        {historyEntries.length > 0 && (
          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-extrabold rounded-lg hover:opacity-95 active:scale-95 shadow-md shadow-red-500/10 transition-all"
          >
            <Trash2 className="w-4 h-4" /> CLEAR HISTORY
          </button>
        )}
      </div>

      {historyEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-300 rounded-2xl bg-white shadow-sm p-8">
          <FolderMinus className="w-16 h-16 text-slate-300 mb-4" />
          <h2 className="font-sans text-lg font-bold text-slate-700">Reading logs purged</h2>
          <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-widest leading-none">NO_LOGS_FOUND_IN_SYSTEM</p>
        </div>
      ) : (
        <div className="relative space-y-12">

          {/* Vertical timeline connector */}
          <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-slate-200/90 pointer-events-none z-0"></div>

          <HistoryTimeline
            title="Today"
            variant="today"
            entries={todayEntries}
            categories={categories}
            onRevisit={onRevisit}
            onRemoveEntry={onRemoveEntry}
            onToast={triggerToast}
          />

          <HistoryTimeline
            title="Yesterday"
            variant="yesterday"
            entries={yesterdayEntries}
            categories={categories}
            onRevisit={onRevisit}
            onRemoveEntry={onRemoveEntry}
            onToast={triggerToast}
          />

          {/* Older Retrieval Hook simulation */}
          <div className="flex justify-center mt-12 pl-12">
            <button
              onClick={() => {
                onRetrieveOlder();
                triggerToast("Logs updated. Restored archived index markers.");
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-slate-300 bg-white text-slate-700 font-mono text-xs font-bold hover:border-blue-500 hover:text-blue-600 active:scale-95 transition-all rounded-lg shadow-sm"
            >
              <RefreshCw className="w-4 h-4 text-blue-500 animate-[spin_4s_linear_infinite]" /> RETRIEVE_OLDER_LOGS
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
