"use client";
import { useRouter } from "next/navigation";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function update(id: number, completed: boolean, refresh: () => void) {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
  });

  // Refresh the current route and fetch new data from the server
  refresh();
}

export default function Todo(todo: Todo) {
  const router = useRouter();

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={e => update(todo.id, !todo.completed, router.refresh)}
      />
      {todo.title}
    </li>
  );
}
