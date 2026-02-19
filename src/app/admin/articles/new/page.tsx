"use client";

import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">New Article</h1>
      <ArticleForm />
    </div>
  );
}
