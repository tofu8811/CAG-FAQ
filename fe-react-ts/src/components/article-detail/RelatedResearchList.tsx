import React from "react";
import { Article, Category } from "../../types";
import { RELATED_RESEARCH } from "../../data";
import { ArticleSideList, ArticleSideListItem } from "../article/ArticleSideList";

interface RelatedResearchListProps {
    article: Article;
    articlesPool: Article[];
    categories: Category[];
    onSelectRelated: (article: Article) => void;
    onNotify: (message: string) => void;
}

export const RelatedResearchList: React.FC<RelatedResearchListProps> = ({
    article,
    articlesPool,
    categories,
    onSelectRelated,
    onNotify
}) => {
    const items: ArticleSideListItem[] = RELATED_RESEARCH.map((rel) => ({
        id: rel.id,
        title: rel.title,
        meta: categories.find((category) => category.id === rel.categoryId)?.name ?? "Uncategorized",
        subMeta: `${rel.duration} / ${rel.date}`
    }));

    return (
        <ArticleSideList
            title="Related Research"
            items={items}
            onItemClick={(item) => {
                const related = RELATED_RESEARCH.find((rel) => rel.id === item.id);
                if (!related) return;

                const matchedRel =
                    articlesPool.find(
                        (a) => a.categoryId === related.categoryId
                    ) || article;

                onSelectRelated(matchedRel);
                onNotify(`Navigated to: ${related.title}`);
            }}
        />
    );
};
