import { ID } from "appwrite";
import databases, { client } from "~/appwrite";
import type { Route } from "../+types/root";
import { Link, NavLink } from "react-router";

export const loader = async () => {
  return await databases.listDocuments(
    "684506be003e5f356bcc",
    "684506d70020b2852d65"
  );
};

const alltodos = ({ loaderData }: Route.ComponentProps) => {
  // const sendPing = async () => {
  //   return await client.ping();
  // };

  return (
    <main className=" min-h-[100vh] w-full flex flex-col p-[26px] bg-black">
      <section className="flex justify-between items-center mb-[22px]">
        <h2 className=" text-[2.2rem] font-bold">All Todos</h2>
        <Link
          to="/new"
          className="text-[1.6rem] font-bold cursor-pointer bg-[#111] text-white py-[8px] px-[16px] rounded-md"
        >
          New Todo
        </Link>
      </section>
      {loaderData.documents?.map((todo: { $id: string; todo: string }) => (
        <Link to={`/todos/${todo.$id}`} className="-">
          <h3 className="text-[1.6rem] font-[600] text-[#f1f1f1]">
            {todo.todo}
          </h3>
        </Link>
      ))}
    </main>
  );
};

export default alltodos;
