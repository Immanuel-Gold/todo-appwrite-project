import { Form, Link, redirect, type ActionFunctionArgs } from "react-router";

import databases from "~/appwrite";

import { ID } from "appwrite";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    const todo = formData.get("todo-value") as string;

    if (!todo) {
      return { error: "Fill in a Todo!" };
    }

    await databases.createDocument(
      "684506be003e5f356bcc",
      "684506d70020b2852d65",
      ID.unique(),
      { todo }
    );

    return redirect("/");
  } catch (error) {
    return { error };
  }
};

const newtodo = () => {
  return (
    <main className="flex flex-col gap-y-[36px] p-[22px]">
      <section className="flex justify-between items-center">
        <h2 className="text-[2.6rem] font-bold">Create New Todo</h2>

        <Link
          to="/"
          className="text-[1.4rem] font-bold bg-[#111] py-[8px] px-[14px] rounded-md"
        >
          Go Back
        </Link>
      </section>
      <Form method="post" className="flex flex-col gap-y-[12px]">
        <input
          type="text"
          name="todo-value"
          placeholder="New Todo..."
          className="border-white border-[1.3px] py-[8px] px-[16px] rounded-md"
        />
        <button
          type="submit"
          className="self-start bg-[#111] py-[8px] px-[16px] rounded-md cursor-pointer"
        >
          Add Todo
        </button>
      </Form>
    </main>
  );
};

export default newtodo;
