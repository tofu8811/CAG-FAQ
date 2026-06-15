import React, { useState } from "react";
import { SavedEntry, Article, Category } from "../types";
import { useToast } from "../contexts/ToastContext";
import { SavedArchiveList } from "../components/saved/SavedArchiveList";
import { SavedArticleCard } from "../components/saved/SavedArticleCard";
import { SavedEmptyState } from "../components/saved/SavedEmptyState";
import { SavedHeader } from "../components/saved/SavedHeader";
import { useSavedExport } from "../hooks/useSavedExport";

interface SavedProps {
  savedEntries: SavedEntry[];
  categories: Category[];
  onRemoveSave: (articleId: string) => void;
  onReadArticle: (article: Article) => void;
}

export const Saved: React.FC<SavedProps> = ({
  savedEntries,
  categories,
  onRemoveSave,
  onReadArticle
}) => {
  const [filterVal, setFilterVal] = useState("");
  const { triggerToast } = useToast();
  const { exportSuccess, exportSavedEntries } = useSavedExport({
    savedEntries,
    onSuccess: () => triggerToast("Bookmarks registry exported successfully as schema JSON"),
    onError: () => triggerToast("Export error. Secure frame restrictions applied.")
  });

  const getCategoryName = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.name ?? "Uncategorized";

  const filtered = savedEntries.filter(entry =>
    entry.article.title.toLowerCase().includes(filterVal.toLowerCase()) ||
    getCategoryName(entry.article.categoryId).toLowerCase().includes(filterVal.toLowerCase())
  );

  const handleRemoveSave = (articleId: string) => {
    onRemoveSave(articleId);
    triggerToast("Removed bookmark");
  };

  const primaryHighlight = filtered[0];
  const secondaryHighlight = filtered[1];
  const subList = filtered.slice(2);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 relative">
      <SavedHeader
        filterVal={filterVal}
        exportSuccess={exportSuccess}
        hasSavedEntries={savedEntries.length > 0}
        setFilterVal={setFilterVal}
        onExport={exportSavedEntries}
      />

      {savedEntries.length === 0 ? (
        <SavedEmptyState />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <SavedArticleCard
              entry={primaryHighlight}
              variant="primary"
              categoryName={primaryHighlight ? getCategoryName(primaryHighlight.article.categoryId) : ""}
              onReadArticle={onReadArticle}
              onRemoveSave={handleRemoveSave}
            />

            <SavedArticleCard
              entry={secondaryHighlight}
              variant="secondary"
              categoryName={secondaryHighlight ? getCategoryName(secondaryHighlight.article.categoryId) : ""}
              onReadArticle={onReadArticle}
              onRemoveSave={handleRemoveSave}
            />
          </div>

          <SavedArchiveList
            entries={subList}
            getCategoryName={getCategoryName}
            onReadArticle={onReadArticle}
            onRemoveSave={handleRemoveSave}
          />
        </div>
      )}
    </div>
  );
};
