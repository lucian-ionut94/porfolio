"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DbProject } from "@/types/database";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<DbProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/projects/${params.id}`)
      .then(async (res) => {
        if (res.ok) {
          setProject(await res.json());
        } else {
          setError("Project not found");
        }
      })
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <p className="text-white/50">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!project) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit Project: {project.title}</h1>
      <ProjectForm project={project} />
    </div>
  );
}
