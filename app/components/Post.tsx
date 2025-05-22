
"use client";

import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatDate } from '../(classic layout)/blog/formatDate'

export function Post({ post }) {
    return (
        <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link
                className="flex flex-col space-y-1 mb-4"
                href={`/blog/${post.slug}`}
            >
                <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                    <p className="text-neutral-600 dark:text-neutral-400 w-[120px] tabular-nums">
                        {formatDate(post.metadata.publishedAt, false)}
                    </p>
                    <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {post.metadata.title}
                    </p>
                </div>
            </Link>
        </motion.div>
    )
}