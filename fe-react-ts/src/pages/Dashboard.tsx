import React from "react";
import { Article, Category } from "../types";
import { useToast } from "../contexts/ToastContext";
import { ArticlesTable } from "../components/dashboard/ArticlesTable";
import { DashboardHeader, StatsGrid } from "../components/dashboard/StatsGrid";
import { StorageGauge } from "../components/dashboard/StorageGauge";
import { TrafficChart } from "../components/dashboard/TrafficChart";
import { useDashboardTelemetry } from "../hooks/useDashboardTelemetry";

interface DashboardProps {
  articles: Article[];
  categories: Category[];
  onDeleteArticle: (id: string) => void;
  onReadArticle: (article: Article) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  articles,
  categories,
  onDeleteArticle,
  onReadArticle
}) => {
  const { ticker, ramFootprint, readersCount } = useDashboardTelemetry();
  const { triggerToast } = useToast();

  const handleRowDelete = (id: string) => {
    onDeleteArticle(id);
    triggerToast(`Document container [${id}] decommissioned successfully.`);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-10 relative">
      <DashboardHeader />

      <StatsGrid
        ticker={ticker}
        ramFootprint={ramFootprint}
        readersCount={readersCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <TrafficChart />
        <StorageGauge />
      </div>

      <ArticlesTable
        articles={articles}
        categories={categories}
        onReadArticle={onReadArticle}
        onDeleteArticle={handleRowDelete}
      />
    </div>
  );
};
