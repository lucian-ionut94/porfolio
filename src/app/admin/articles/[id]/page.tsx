"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DbArticle } from "@/types/database";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function EditArticlePage() {
  const params = useParams<{ id: string }>();
  const [article, setArticle] = useState<DbArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/articles/${params.id}`)
      .then(async (res) => {
        if (res.ok) {
          setArticle(await res.json());
        } else {
          setError("Article not found");
        }
      })
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <p className="text-white/50">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!article) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Article: {article.title_en}</h1>
      <ArticleForm article={article} />
    </div>
  );
}
