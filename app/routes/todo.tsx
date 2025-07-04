import databases from "~/appwrite";
import type { Route } from "./+types/todo";
import { Form, Link, redirect, type ActionFunctionArgs } from "react-router";
import type { LoaderFunction } from "react-router";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const id = params.id;

  const todo = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID as string,
      process.env.APPWRITE_COLLECTION_ID as string,
    id
  );

  return { todo };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params?.id;
  const formData = await request.formData();

  const todo = formData.get("todo-value");

  const intent = formData.get("intent");

  if (!todo) {
    return { error: "Fill In a Todo!" };
  }

  if (intent === "update") {
    const response = await databases.updateDocument(
    process.env.APPWRITE_DATABASE_ID as string,
      process.env.APPWRITE_COLLECTION_ID as string,
      params.id as string,
      { todo }
    );

    return { updated: true };
  } else if (intent === "delete") {
    const response = await databases.deleteDocument(
         process.env.APPWRITE_DATABASE_ID as string,
      process.env.APPWRITE_COLLECTION_ID as string,
      params.id as string
    );

    return redirect("/");
  }
};

const todo = ({ loaderData, actionData }: Route.ComponentProps) => {
  console.log(loaderData);

  return (
    <main className="h-[100vh] w-full bg-black flex flex-col gap-y-[22px] p-[22px]">
      <section className="flex justify-between items-center">
        <h2 className="text-[2.2rem] font-bold text-[#f1f1f1]">
          {loaderData.todo.todo}
        </h2>
        <Link
          to="/"
          className="text-[1.4rem] font-bold cursor-pointer bg-[#111] text-white py-[8px] px-[16px] rounded-md"
        >
          Back Home
        </Link>
      </section>

      {actionData?.updated && (
        <p className="text-[1.6rem] font-bold text-green-500">
          Todo Updated Successfully!
        </p>
      )}

      <Form method="post" className="flex flex-col gap-y-[22px]">
        <h2 className="text-[1.6rem] font-[600]">Edit Todo</h2>
        <input
          type="text"
          name="todo-value"
          defaultValue={loaderData.todo.todo}
          className="border-white border-[1.3px] py-[8px] px-[16px] rounded-md"
        />
        <section className="flex items-center self-start gap-x-[32px] [&>button]:bg-[#111] [&>button]:py-[8px] [&>button]:px-[16px] [&>button]:rounded-md [&>button]:cursor-pointer">
          <button type="submit" name="intent" value="update">
            Update Todo
          </button>
          <button type="submit" name="intent" value="delete">
            Delete Todo
          </button>
        </section>
      </Form>
    </main>
  );
};

export default todo;
