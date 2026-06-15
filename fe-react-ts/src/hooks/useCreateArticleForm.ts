import { useEffect, useState } from "react";
import { Article, Category } from "../types";

interface UseCreateArticleFormOptions {
  categories: Category[];
}

export function useCreateArticleForm({
  categories,
}: UseCreateArticleFormOptions) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<Category["id"]>(categories[0]?.id ?? "ai-ml");
  const [tagsInput, setTagsInput] = useState("OPTIMIZATION, NEW_RESEARCH");

  const [overrideReadTime, setOverrideReadTime] = useState(false);
  const [manualReadTime, setManualReadTime] = useState("10 MIN READ");

  const [allowComments, setAllowComments] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [cryptographicSignoff, setCryptographicSignoff] = useState(true);

  const [selectedCover, setSelectedCover] = useState("neural-network");

  const [authorName, setAuthorName] = useState("Dr. Aris Thorne");
  const [authorRole, setAuthorRole] = useState("Senior ML Architect @ TECH_LABS");
  const [authorInitials, setAuthorInitials] = useState("AT");

  const [lastSaved, setLastSaved] = useState<string>("SYNCED");
  const [hashDigest, setHashDigest] = useState<string>("B8F2...4E91");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");

  const selectedCategoryName =
    categories.find((category) => category.id === categoryId)?.name ?? "Uncategorized";

  useEffect(() => {
    const trimmed = content.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    setWordCount(words);
    setCharCount(content.length);

    if (title || content) {
      const pseudoHash = Math.abs((title + content).split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0)).toString(16).toUpperCase().substring(0, 8);
      setHashDigest(`${pseudoHash}...${pseudoHash ? "9EA1" : "0000"}`);
    } else {
      setHashDigest("E3B0...D411");
    }

    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLastSaved(`DRAFT_CACHED_AT_${timeStr}`);
  }, [title, content]);

  const computedReadTimeVal = Math.max(1, Math.ceil(wordCount / 180));
  const activeReadTimeStr = overrideReadTime
    ? manualReadTime.trim().toUpperCase()
    : `${computedReadTimeVal} MIN READ`;

  const parsedTags = tagsInput
    .split(",")
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .map(tag => tag.startsWith("#") ? tag : `#${tag}`);

  const appendMarkdown = (prefix: string, suffix: string) => {
    setContent(prev => prev + prefix + suffix);
  };

  const resetDraft = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setErrorBanner(null);
    setEditorMode("write");
  };

  const saveDraft = () => {
    setErrorBanner(null);
  };

  const buildArticle = (): Article | null => {
    setErrorBanner(null);

    if (!title.trim()) {
      setErrorBanner("Critical Frame Failure: Document [Title] field is empty.");
      setEditorMode("write");
      return null;
    }

    if (!excerpt.trim()) {
      setErrorBanner("Critical Frame Failure: Document [Excerpt / Synopsis] field is empty.");
      setEditorMode("write");
      return null;
    }

    if (!content.trim()) {
      setErrorBanner("Critical Frame Failure: Document [Content Body Text] is empty.");
      setEditorMode("write");
      return null;
    }

    return {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      categoryId,
      readTime: activeReadTimeStr,
      date: new Date()
        .toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
        .toUpperCase(),
      author: {
        name: authorName.trim() || "Dr. Aris Thorne",
        role: authorRole.trim() || "Research Fellow",
        avatar: authorInitials.toUpperCase().substring(0, 2) || "AT",
      },
      coverImage: selectedCover,
      tags: parsedTags.length > 0 ? parsedTags : ["#RESEARCH", "#DEV_COMMUNITY"],
      stats: { views: "1.0K", shares: 0, comments: 0 },
      featured,
    };
  };

  return {
    title,
    setTitle,
    excerpt,
    setExcerpt,
    content,
    setContent,
    categoryId,
    setCategoryId,
    tagsInput,
    setTagsInput,
    overrideReadTime,
    setOverrideReadTime,
    manualReadTime,
    setManualReadTime,
    allowComments,
    setAllowComments,
    isPublic,
    setIsPublic,
    featured,
    setFeatured,
    cryptographicSignoff,
    setCryptographicSignoff,
    selectedCover,
    setSelectedCover,
    authorName,
    setAuthorName,
    authorRole,
    setAuthorRole,
    authorInitials,
    setAuthorInitials,
    lastSaved,
    hashDigest,
    wordCount,
    charCount,
    errorBanner,
    setErrorBanner,
    editorMode,
    setEditorMode,
    selectedCategoryName,
    activeReadTimeStr,
    parsedTags,
    appendMarkdown,
    saveDraft,
    resetDraft,
    buildArticle
  };
}
