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
  links: {},
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema { }
const schema: AppSchema = _schema;

type Todo = InstaQLEntity<typeof schema, "todos">;
type Project = InstaQLEntity<typeof schema, "projects">;

export type { AppSchema, Todo, Project };
export default schema;
