import { useState } from "react";
import { SavedEntry } from "../types";

interface UseSavedExportOptions {
  savedEntries: SavedEntry[];
  onSuccess: () => void;
  onError: () => void;
}

export function useSavedExport({
  savedEntries,
  onSuccess,
  onError
}: UseSavedExportOptions) {
  const [exportSuccess, setExportSuccess] = useState(false);

  const exportSavedEntries = () => {
    if (savedEntries.length === 0) return;

    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedEntries, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "techlabs_bookmarks_export.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setExportSuccess(true);
      onSuccess();
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (e) {
      onError();
    }
  };

  return { exportSuccess, exportSavedEntries };
}
