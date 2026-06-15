import React from "react";
import { Article, TrendingListItem } from "../../types";
import { ArticleSideList, ArticleSideListItem } from "../article/ArticleSideList";

interface TrendingListProps {
  items: TrendingListItem[];
  onSelectArticle: (article: Article) => void;
}

export const TrendingList: React.FC<TrendingListProps> = ({
  items,
  onSelectArticle
}) => {
  const sideListItems: ArticleSideListItem[] = items.map(item => ({
    id: item.id,
    title: item.title,
    meta: item.meta,
    subMeta: item.subMeta,
  }));

  return (
    <ArticleSideList
      title="Trending Now"
      items={sideListItems}
      onItemClick={(clickedItem) => {
        const matchedItem = items.find(item => item.id === clickedItem.id);
        if (matchedItem) {
          onSelectArticle(matchedItem.article);
        }
      }}
    />
  );
};
