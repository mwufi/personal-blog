"use client";

import { db } from "@/lib/instant";
import AppSchema from "@/instant.schema";
import { id } from "@instantdb/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Twitter } from "lucide-react";
import Link from "next/link";

// Types
type Project = (typeof AppSchema)["entities"]["projects"];

function CreateProjectForm({
    onSuccess,
}: {
    onSuccess?: (project: Project) => void;
}) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const url = formData.get("url") as string;
        const imageUrl = formData.get("imageUrl") as string;
        const status = formData.get("status") as string;

        if (!name) {
            // Basic validation
            alert("Project name is required.");
            return;
        }

        const newProjectData = {
            name,
            description,
            url,
            imageUrl,
            status,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        try {
            const newProjectId = id();
            await db.transact([
                db.tx.projects[newProjectId].update(newProjectData)
            ]);

            // Optimistically construct the project object for the callback
            const createdProject = { ...newProjectData, id: newProjectId } as Project;

            if (onSuccess) {
                onSuccess(createdProject);
            }
            (event.target as HTMLFormElement).reset(); // Reset form
        } catch (error) {
            console.error("Failed to create project:", error);
            alert("Failed to create project. See console for details.");
        }
    };

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Create New Project</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Project Name*
                        </label>
                        <Input id="name" name="name" required />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium mb-1"
                        >
                            Description
                        </label>
                        <Textarea id="description" name="description" />
                    </div>
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium mb-1">
                            Project URL
                        </label>
                        <Input id="url" name="url" />
                    </div>
                    <div>
                        <label
                            htmlFor="imageUrl"
                            className="block text-sm font-medium mb-1"
                        >
                            Image URL
                        </label>
                        <Input id="imageUrl" name="imageUrl" />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium mb-1">
                            Status (e.g., active, idea)
                        </label>
                        <Input id="status" name="status" />
                    </div>
                    <Button type="submit" className="flex items-center">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const tweetText = `Check out my project: ${project.name}! ${project.description ? project.description + " " : ""
        }${project.url ? project.url : ""}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetText
    )}`;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {project.imageUrl && (
                    <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="rounded-md mb-2 max-h-48 w-full object-cover"
                    />
                )}
                {project.description && <p>{project.description}</p>}
                {project.url && (
                    <p>
                        <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Visit Project
                        </Link>
                    </p>
                )}
                {project.status && <p className="text-sm text-gray-500">Status: {project.status}</p>}
                <Button asChild variant="outline">
                    <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
                        <Twitter className="mr-2 h-4 w-4" /> Tweet about this
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}

export default function ProjectsPage() {
    const { data, isLoading, error } = db.useQuery({ projects: {} });

    if (isLoading) return <p>Loading projects...</p>;
    if (error) return <p>Error loading projects: {error.message}</p>;

    const projects = data?.projects || [];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">My Projects</h1>
            <CreateProjectForm
                onSuccess={(newProject) => {
                    // This is a bit of a hack to refresh the list.
                    // Ideally, InstantDB would auto-update the query.
                    // For now, we can force a re-fetch or optimistic update if needed.
                    // For simplicity, we're just showing the new project if the query updates.
                    console.log("New project created:", newProject);
                }}
            />
            {projects.length === 0 && !isLoading ? (
                <p>No projects yet. Add one above!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
} 