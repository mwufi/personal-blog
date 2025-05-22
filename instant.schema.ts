// Docs: https://www.instantdb.com/docs/modeling-data

import { i, InstaQLEntity } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed().optional(),
      url: i.any().optional(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
    }),
    // Document management
    documents: i.entity({
      name: i.string(),
      type: i.string(),
      size: i.number(),
      userId: i.string().indexed(),
      supabaseUrl: i.string(),
      storagePath: i.string(),
      status: i.string(), // 'uploading', 'processing', 'ready', 'error'
      uploadedAt: i.number(),
      chunkCount: i.number().optional(),
      metadata: i.any().optional(), // { pages, wordCount, topics, etc }
      tags: i.any().optional(),
    }),
    // Collections for organizing documents and notes
    collections: i.entity({
      name: i.string(),
      description: i.string().optional(),
      color: i.string(),
      userId: i.string().indexed(),
      isDefault: i.boolean(),
      createdAt: i.number(),
      updatedAt: i.number(),
    }),
    // Notes within collections
    notes: i.entity({
      title: i.string(),
      content: i.string(), // Markdown
      userId: i.string().indexed(),
      collectionId: i.string().indexed(),
      tags: i.any().optional(),
      isIndexed: i.boolean(),
      chunkCount: i.number().optional(),
      createdAt: i.number(),
      updatedAt: i.number(),
    }),
    // Chat Sessions
    chatSessions: i.entity({
      name: i.string(),
      userId: i.string().indexed(),
      documentIds: i.any(), // Array of document IDs
      collectionIds: i.any().optional(), // Array of collection IDs
      createdAt: i.number(),
      updatedAt: i.number(),
      lastMessageAt: i.number().optional(),
    }),
    // Chat Messages
    chatMessages: i.entity({
      sessionId: i.string().indexed(),
      role: i.string(), // 'user' | 'assistant'
      content: i.string(),
      sources: i.any().optional(), // Source citations
      userId: i.string().indexed(),
      timestamp: i.number(),
    }),
    // Existing entities
    todos: i.entity({
      createdAt: i.number().optional(),
      done: i.boolean().optional(),
      text: i.string().optional(),
    }),
    projects: i.entity({
      name: i.string(),
      description: i.string().optional(),
      url: i.string().optional(),
      imageUrl: i.string().optional(),
      status: i.string().optional(),
      createdAt: i.number().optional(),
      updatedAt: i.number().optional(),
    }),
  },
  links: {
    // User relationships
    userDocuments: {
      forward: { on: "documents", has: "one", label: "user" },
      reverse: { on: "$users", has: "many", label: "documents" }
    },
    userCollections: {
      forward: { on: "collections", has: "one", label: "user" },
      reverse: { on: "$users", has: "many", label: "collections" }
    },
    userNotes: {
      forward: { on: "notes", has: "one", label: "user" },
      reverse: { on: "$users", has: "many", label: "notes" }
    },
    // Collection relationships
    collectionNotes: {
      forward: { on: "notes", has: "one", label: "collection" },
      reverse: { on: "collections", has: "many", label: "notes" }
    },
    // Chat relationships
    sessionMessages: {
      forward: { on: "chatMessages", has: "one", label: "session" },
      reverse: { on: "chatSessions", has: "many", label: "messages" }
    },
  },
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema { }
const schema: AppSchema = _schema;

type Todo = InstaQLEntity<typeof schema, "todos">;
type Project = InstaQLEntity<typeof schema, "projects">;
type Document = InstaQLEntity<typeof schema, "documents">;
type Collection = InstaQLEntity<typeof schema, "collections">;
type Note = InstaQLEntity<typeof schema, "notes">;
type ChatSession = InstaQLEntity<typeof schema, "chatSessions">;
type ChatMessage = InstaQLEntity<typeof schema, "chatMessages">;

export type { AppSchema, Todo, Project, Document, Collection, Note, ChatSession, ChatMessage };
export default schema;
