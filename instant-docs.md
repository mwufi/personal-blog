## Reading data

Instant uses a declarative syntax for querying. It's like GraphQL without the configuration. Here's how you can query data with InstaQL.

Fetch namespace
One of the simplest queries you can write is to simply get all entities of a namespace.

import { init } from '@instantdb/react';

const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID!,
});

function App() {
  // Queries! 🚀
  const query = { goals: {} };
  const { isLoading, error, data } = db.useQuery(query);
  // ...
}
Inspecting data, we'll see:

console.log(data)
{
  "goals": [
    {
      "id": healthId,
      "title": "Get fit!"
    },
    {
      "id": workId,
      "title": "Get promoted!"
    }
  ]
}
For comparison, the SQL equivalent of this would be something like:

const data = { goals: doSQL('SELECT * FROM goals') };
Fetch multiple namespaces
You can fetch multiple namespaces at once:

const query = { goals: {}, todos: {} };
const { isLoading, error, data } = db.useQuery(query);
We will now see data for both namespaces.

console.log(data)
{
  "goals": [...],
  "todos": [
    {
      "id": focusId,
      "title": "Code a bunch"
    },
    {
      "id": proteinId,
      "title": "Drink protein"
    },
    ...
  ]
}
The equivalent of this in SQL would be to write two separate queries.

const data = {
  goals: doSQL('SELECT * from goals'),
  todos: doSQL('SELECT * from todos'),
};
Fetch a specific entity
If you want to filter entities, you can use the where keyword. Here we fetch a specific goal

const query = {
  goals: {
    $: {
      where: {
        id: healthId,
      },
    },
  },
};
const { isLoading, error, data } = db.useQuery(query);
console.log(data)
{
  "goals": [
    {
      "id": healthId,
      "title": "Get fit!"
    }
  ]
}
The SQL equivalent would be:

const data = { goals: doSQL("SELECT * FROM goals WHERE id = 'healthId'") };
Fetch associations
We can fetch goals and their related todos.

const query = {
  goals: {
    todos: {},
  },
};
const { isLoading, error, data } = db.useQuery(query);
goals would now include nested todos

console.log(data)
{
  "goals": [
    {
      "id": healthId,
      "title": "Get fit!",
      "todos": [...],
    },
    {
      "id": workId,
      "title": "Get promoted!",
      "todos": [...],
    }
  ]
}
Comparing with SQL
The SQL equivalent for this would be something along the lines of:

const query = `
  SELECT g.*, gt.todos
  FROM goals g
  JOIN (
      SELECT g.id, json_agg(t.*) as todos
      FROM goals g
      LEFT JOIN todos t on g.id = t.goal_id
      GROUP BY 1
  ) gt on g.id = gt.id
`;
const data = { goals: doSQL(query) };
Notice the complexity of this SQL query. Although fetching associations in SQL is straightforward via JOIN, marshalling the results in a nested structure via SQL is tricky. An alternative approach would be to write two straight-forward queries and then marshall the data on the client.

const _goals = doSQL("SELECT * from goals")
const _todos = doSQL("SELECT * from todos")
const data = {goals: _goals.map(g => (
  return {...g, todos: _todos.filter(t => t.goal_id === g.id)}
))
Now compare these two approaches with InstaQL

const query = {
  goals: {
    todos: {},
  },
};
const { isLoading, error, data } = db.useQuery(query);
Modern applications often need to render nested relations, InstaQL really starts to shine for these use cases.

Fetch specific associations
A) Fetch associations for filtered namespace
We can fetch a specific entity in a namespace as well as it's related associations.

const query = {
  goals: {
    $: {
      where: {
        id: healthId,
      },
    },
    todos: {},
  },
};
const { isLoading, error, data } = db.useQuery(query);
Which returns

console.log(data)
{
  "goals": [
    {
      "id": healthId,
      "title": "Get fit!",
      "todos": [
        {
          "id": proteinId,
          "title": "Drink protein"
        },
        {
          "id": sleepId,
          "title": "Go to bed early"
        },
        {
          "id": workoutId,
          "title": "Go on a run"
        }
      ]
    }
  ]
}
B) Filter namespace by associated values
We can filter namespaces by their associations

const query = {
  goals: {
    $: {
      where: {
        'todos.title': 'Code a bunch',
      },
    },
    todos: {},
  },
};
const { isLoading, error, data } = db.useQuery(query);
Returns

console.log(data)
{
  "goals": [
    {
      "id": workId,
      "title": "Get promoted!",
      "todos": [
        {
          "id": focusId,
          "title": "Code a bunch"
        },
        {
          "id": reviewPRsId,
          "title": "Review PRs"
        },
        {
          "id": standupId,
          "title": "Do standup"
        }
      ]
    }
  ]
}

## Writing data

Writing data
Instant uses a Firebase-inspired interface for mutations. We call our mutation language InstaML

Update data
We use the update action to create entities.

import { init, id } from '@instantdb/react';

const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID!,
});

// transact! 🔥
db.transact(db.tx.goals[id()].update({ title: 'eat' }));
This creates a new goal with the following properties:

It's identified by a randomly generated id via the id() function.
It has an attribute title with value eat.
Similar to NoSQL, you don't need to use the same schema for each entity in a namespace. After creating the previous goal you can run the following:

db.transact(
  db.tx.goals[id()].update({
    priority: 'none',
    isSecret: true,
    value: 10,
    aList: [1, 2, 3],
    anObject: { foo: 'bar' },
  }),
);
You can store strings, numbers, booleans, arrays, and objects as values. You can also generate values via functions. Below is an example for picking a random goal title.

db.transact(
  db.tx.goals[id()].update({
    title: ['eat', 'sleep', 'hack', 'repeat'][Math.floor(Math.random() * 4)],
  }),
);
The update action is also used for updating entities. Suppose we had created the following goal

const eatId = id();
db.transact(
  db.tx.goals[eatId].update({ priority: 'top', lastTimeEaten: 'Yesterday' }),
);
We eat some food and decide to update the goal. We can do that like so:

db.transact(db.tx.goals[eatId].update({ lastTimeEaten: 'Today' }));
This will only update the value of the lastTimeEaten attribute for entity eat.

Merge data
When you update an attribute, you overwrite it. This is fine for updating values of strings, numbers, and booleans. But if you use update to overwrite json objects you may encounter two problems:

You lose any data you didn't specify.
You risk clobbering over changes made by other clients.
For example, imagine we had a game entity, that stored a state of favorite colors:

// User 1 saves {'0-0': 'red'}
db.transact(db.tx.games[gameId].update({ state: { '0-0': 'red' } }));

// User 2 saves {'0-1': 'blue'}
db.transact(db.tx.games[gameId].update({ state: { '0-1': 'blue' } }));

// 🤔 Uh oh! User 2 overwrite User 1:
// Final State: {'0-1': 'blue' }
To make working with deeply-nested, document-style JSON values a breeze, we created merge. Similar to lodash's merge function, merge allows you to specify the slice of data you want to update:

// User 1 saves {'0-0': 'red'}
db.transact(db.tx.games[gameId].merge({ state: { '0-0': 'red' } }));

// User 2 saves {'0-1': 'blue'}
db.transact(db.tx.games[gameId].merge({ state: { '0-1': 'blue' } }));

// ✅ Wohoo! Both states are merged!
// Final State: {'0-0': 'red', '0-1': 'blue' }
merge only merges objects. Calling merge on arrays, numbers, or booleans will overwrite the values.

Sometimes you may want to remove keys from a nested object. You can do so by calling merge with a key set to null or undefined. This will remove the corresponding property from the object.

// State: {'0-0': 'red', '0-1': 'blue' }
db.transact(db.tx.games[gameId].merge({ state: { '0-1': null } }));
// New State! {'0-0': 'red' }
Delete data
The delete action is used for deleting entities.

db.transact(db.tx.goals[eatId].delete());
You can generate an array of delete txs to delete all entities in a namespace

const { isLoading, error, data } = db.useQuery({ goals: {} });
const { goals } = data;
// ...

db.transact(goals.map((g) => db.tx.goals[g.id].delete()));
Calling delete on an entity also deletes its associations. So no need to worry about cleaning up previously created links.

Link data
link is used to create associations.

Suppose we create a goal and a todo.

db.transact([
  db.tx.todos[workoutId].update({ title: 'Go on a run' }),
  db.tx.goals[healthId].update({ title: 'Get fit!' }),
]);
We can associate healthId with workoutId like so:

db.transact(db.tx.goals[healthId].link({ todos: workoutId }));
We could have done all this in one transact too via chaining transaction chunks.

db.transact([
  db.tx.todos[workoutId].update({ title: 'Go on a run' }),
  db.tx.goals[healthId]
    .update({ title: 'Get fit!' })
    .link({ todos: workoutId }),
]);
You can specify multiple ids in one link as well:

db.transact([
  db.tx.todos[workoutId].update({ title: 'Go on a run' }),
  db.tx.todos[proteinId].update({ title: 'Drink protein' }),
  db.tx.todos[sleepId].update({ title: 'Go to bed early' }),
  db.tx.goals[healthId]
    .update({ title: 'Get fit!' })
    .link({ todos: [workoutId, proteinId, sleepId] }),
]);
Links are bi-directional. Say we link healthId to workoutId

db.transact(db.tx.goals[healthId].link({ todos: workoutId }));
We can query associations in both directions

const { isLoading, error, data } = db.useQuery({
  goals: { todos: {} },
  todos: { goals: {} },
});

const { goals, todos } = data;
console.log('goals with nested todos', goals);
console.log('todos with nested goals', todos);
Unlink data
Links can be removed via unlink.

db.transact(db.tx.goals[healthId].unlink({ todos: workoutId }));
This removes links in both directions. Unlinking can be done in either direction so unlinking workoutId from healthId would have the same effect.

db.transact([db.tx.todos[workoutId].unlink({ goals: healthId })]);
We can unlink multiple ids too:

db.transact([
  db.tx.goals[healthId].unlink({ todos: [workoutId, proteinId, sleepId] }),
  db.tx.goals[workId].unlink({ todos: [standupId, reviewPRsId, focusId] }),
]);
Lookup by unique attribute
If your entity has a unique attribute, you can use lookup in place of the id to perform updates.

import { lookup } from '@instantdb/react';

db.transact(
  db.tx.profiles[lookup('email', 'eva_lu_ator@instantdb.com')].update({
    name: 'Eva Lu Ator',
  }),
);
The lookup function takes the attribute as its first argument and the unique attribute value as its second argument.

When it is used in a transaction, the updates will be applied to the entity that has the unique value. If no entity has the value, then a new entity with a random id will be created with the value.

It can be used with update, delete, merge, link, and unlink.

Lookups in links
When used with links, it can also be used in place of the linked entity's id.

db.transact(
  db.tx.users[lookup('email', 'eva_lu_ator@instantdb.com')].link({
    posts: lookup('number', 15), // using a lookup in place of the id
  }),
);
Transacts are atomic
When you call db.transact, all the transactions are committed atomically. If any of the transactions fail, none of them will be committed.

Typesafety
By default, db.transact is permissive. When you save data, we'll create missing attributes for you:

db.tx.todos[workoutId].update({
  // Instant will automatically create this attribute
  dueDate: Date.now() + 60 * 1000,
});
As your app grows, you may want to start enforcing types. When you're ready, you can start using a schema:

import { init } from '@instantdb/react';

import schema from '../instant.schema.ts';

const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID!,
  schema,
});
If your schema includes a todos.dueDate for example:

// instant.schema.ts

const _schema = i.schema({
  entities: {
    todos: i.entity({
      // ...
      dueDate: i.date(),
    }),
  },
  // ...
});
// ...
Instant will enforce that todos.dueDate are actually dates, and you'll get some nice intellisense to boot:
