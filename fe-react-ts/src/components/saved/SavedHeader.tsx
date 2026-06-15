import { Check, Download, Search } from "lucide-react";

interface SavedHeaderProps {
  filterVal: string;
  exportSuccess: boolean;
  hasSavedEntries: boolean;
  setFilterVal: (value: string) => void;
  onExport: () => void;
}

export const SavedHeader: React.FC<SavedHeaderProps> = ({
  filterVal,
  exportSuccess,
  hasSavedEntries,
  setFilterVal,
  onExport
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-slate-200 pb-8">
    <div>
      <h1 className="font-sans text-3xl font-extrabold text-slate-1000">Saved Research</h1>
      <p className="font-mono text-xs font-bold text-slate-500 mt-2 tracking-wider">
        USER_BOOKMARKED_RECORDS // LOCAL_DATABASE_SYNC
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
      <div className="relative flex-1 md:flex-none min-w-[200px] bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Filter bookmarked..."
          value={filterVal}
          onChange={(e) => setFilterVal(e.target.value)}
          className="bg-transparent border-none outline-none font-sans text-xs w-full text-slate-700"
        />
      </div>

      {hasSavedEntries && (
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-extrabold rounded-lg hover:opacity-95 active:scale-95 shadow-md shadow-blue-500/10 transition-all leading-none"
        >
          {exportSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          {exportSuccess ? "EXPORTED" : "EXPORT BOOKMARKS"}
        </button>
      )}
    </div>
  </div>
);
