import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
    title: 'Projects - Zen',
    description: 'A collection of projects exploring the intersection of AI, mindfulness, and philosophy through code.',
}

// Sample projects data - we'll integrate with your schema later
const projects = [
    {
        title: 'MindfulAI Assistant',
        description: 'An AI chatbot that incorporates Buddhist mindfulness principles into conversations, helping users approach problems with presence and clarity.',
        longDescription: 'Built with OpenAI\'s GPT-4 and custom philosophical frameworks, this assistant guides users through mindful problem-solving techniques. It encourages reflection, non-attachment to outcomes, and compassionate self-inquiry.',
        technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'Tailwind CSS'],
        status: 'In Development',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center',
        liveUrl: '#',
        githubUrl: '#',
        category: 'AI & Machine Learning'
    },
    {
        title: 'Ethical Code Analyzer',
        description: 'A VS Code extension that analyzes code for ethical implications, highlighting potential bias, privacy concerns, and social impact.',
        longDescription: 'This tool integrates philosophical frameworks like utilitarianism and deontological ethics to help developers make more conscious choices about the code they write.',
        technologies: ['TypeScript', 'VS Code API', 'Node.js', 'ESLint'],
        status: 'Beta',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=center',
        liveUrl: '#',
        githubUrl: '#',
        category: 'Developer Tools'
    },
    {
        title: 'Philosophical Decision Trees',
        description: 'An interactive web app that helps users navigate complex decisions using philosophical frameworks and systematic reasoning.',
        longDescription: 'Combines decision science with philosophical inquiry to create structured approaches to life\'s difficult choices. Features guided Socratic questioning and multiple ethical frameworks.',
        technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
        status: 'Live',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center',
        liveUrl: '#',
        githubUrl: '#',
        category: 'Philosophy & Ethics'
    },
    {
        title: 'Meditation Code Review',
        description: 'A tool that applies mindfulness principles to code reviews, encouraging presence, non-judgment, and constructive feedback.',
        longDescription: 'Transforms the often stressful code review process into a mindful practice. Includes guided reflection prompts and compassionate communication templates.',
        technologies: ['GitHub API', 'React', 'Node.js', 'MongoDB'],
        status: 'Planning',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
        liveUrl: '#',
        githubUrl: '#',
        category: 'Developer Tools'
    },
    {
        title: 'Consciousness Simulation Framework',
        description: 'An experimental framework for modeling different theories of consciousness in computational systems.',
        longDescription: 'Explores how various philosophical theories of mind might be implemented in software, from Global Workspace Theory to Integrated Information Theory.',
        technologies: ['Python', 'TensorFlow', 'NetworkX', 'Jupyter'],
        status: 'Research',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop&crop=center',
        liveUrl: '#',
        githubUrl: '#',
        category: 'Research'
    },
    {
        title: 'Zen Programming Blog',
        description: 'A thoughtful blog exploring the intersection of programming, philosophy, and mindful development practices.',
        longDescription: 'Regular articles on applying Buddhist principles to software development, ethical AI considerations, and building technology with intention and wisdom.',
        technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
        status: 'Live',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center',
        liveUrl: '#',
        githubUrl: '#',
        category: 'Content & Writing'
    }
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
    const statusColors = {
        'Live': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
        'Beta': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        'In Development': 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
        'Planning': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
        'Research': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400'
    }

    return (
        <article className="group relative">
            <div className="relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
                <div className="aspect-[16/9] relative">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-zinc-900/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status as keyof typeof statusColors]}`}>
                            {project.status}
                        </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs text-white/80 mb-1">{project.category} • {project.year}</p>
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    </div>
                </div>

                <div className="p-6">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                                +{project.technologies.length - 3} more
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {project.liveUrl && (
                            <Link
                                href={project.liveUrl}
                                className="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                            >
                                View Project →
                            </Link>
                        )}
                        {project.githubUrl && (
                            <Link
                                href={project.githubUrl}
                                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            >
                                Code →
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </article>
    )
}

export default function ProjectsPage() {
    return (
        <div className="sm:px-8 mt-16 sm:mt-32">
            <div className="mx-auto w-full max-w-7xl lg:px-8">
                <div className="relative px-4 sm:px-8 lg:px-12">
                    <div className="mx-auto max-w-2xl lg:max-w-5xl">

                        {/* Header Section */}
                        <header className="max-w-2xl">
                            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                                Building technology with intention and wisdom
                            </h1>
                            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                                A collection of projects that explore the intersection of artificial intelligence,
                                philosophy, and mindful development. Each project reflects my commitment to building
                                technology that serves humanity's highest aspirations while remaining grounded in
                                ethical consideration and thoughtful design.
                            </p>
                        </header>

                        {/* Projects Grid */}
                        <div className="mt-16 sm:mt-20">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                                {projects.map((project, index) => (
                                    <ProjectCard key={project.title} project={project} index={index} />
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-20 sm:mt-24">
                            <div className="rounded-2xl border border-zinc-100 p-8 dark:border-zinc-700/40">
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                    Interested in collaborating?
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                                    I'm always open to discussing projects that combine technology with philosophical
                                    inquiry, ethical AI development, or mindful software practices. Whether you're
                                    working on something similar or want to explore new ideas together, let's connect.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="mailto:zen@example.com"
                                        className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                                    >
                                        Get in touch
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                    >
                                        Learn more about my work
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
} 