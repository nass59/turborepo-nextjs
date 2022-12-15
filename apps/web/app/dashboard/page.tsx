// @see https://beta.nextjs.org/docs/api-reference/components/image

import Todo from "./todo";
import pic1 from "../../public/images/pic1.jpg";
import pic2 from "../../public/images/pic2.jpg";
import pic3 from "../../public/images/pic3.jpg";
import pic4 from "../../public/images/pic4.jpg";
import pic5 from "../../public/images/pic5.jpg";
import pic6 from "../../public/images/pic6.jpg";
import Image from "next/image";

export const revalidate = 300;

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function getData() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=1"
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
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-1 relative">
        <Image
          src={pic1}
          alt="Picture of something"
          className="aspect-video"
          placeholder="blur"
          priority
        />
        <Image
          src={pic2}
          alt="Picture of something"
          className="aspect-video"
          placeholder="blur"
        />
        <Image
          src={pic3}
          alt="Picture of something"
          className="aspect-video"
          placeholder="blur"
        />
        <Image
          src={pic4}
          alt="Picture of something"
          className="aspect-video"
          placeholder="blur"
        />
        <Image
          src={pic5}
          alt="Picture of something"
          className="aspect-video"
          placeholder="blur"
        />
        <Image
          src={pic6}
          alt="Picture of something"
          className="aspect-video"
          placeholder="blur"
        />
      </div>

      <ul className="flex flex-col space-y-2">
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}
