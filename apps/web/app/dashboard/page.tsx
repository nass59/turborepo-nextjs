import PostList from "../(marketing)/blog/PostList";
import Todo from "./todo";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function getData() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=1",
    { next: { revalidate: 100 } }
  );

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getTodos() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const todos: Todo[] = await res.json();
  return todos;
}

export default async function Page() {
  const data = await getData();
  const todos = await getTodos();

  return (
    <div>
      <h1>Dashboard</h1>
      <PostList posts={data} />
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}
