export interface Category {
  id: string;
  name: string;
  slug?: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface ArticleStats {
  views: string;
  shares?: number;
  comments?: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId: Category["id"];
  readTime: string;
  date: string;
  author: Author;
  coverImage?: string;
  tags: string[];
  stats: ArticleStats;
  featured?: boolean;
}

export interface TrendingArticle {
  id: string;
  articleId: Article["id"];
  rank: string;
  domain: string;
  title: string;
  views: string;
  comments: string;
}

export interface TrendingListItem {
  id: string;
  title: string;
  meta: string;
  subMeta: string;
  article: Article;
}

export interface HistoryEntry {
  id: string;
  article: Article;
  viewedAt: string; // e.g. "14:32:01 UTC"
  dateGroup: "Today" | "Yesterday";
}

export interface SavedEntry {
  id: string;
  article: Article;
  savedAt: string; // e.g. "SAVED 2D AGO"
}

export type ViewTab = "Home" | "History" | "Saved" | "Create" | "Dashboard" | "Detail";
