import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import TasksList from "./AllTasks";

function CreateTaskForm({ feed }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState("false");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (text) {
      // send request to the server.
      try {
        const body = { text };
        await fetch(`/api/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        setText("");
        await router.push("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Content box cannot be empty!");
      return;
    }
  }

  return (
    <Fragment>
      <div className="flex items-center justify-center mt-40">
        <button onClick={() => setOpen(!open)}>
          {open ? "Close" : "Open Todo's"}
        </button>
      </div>
      <div
        className={`mobile-menu ${
          open
            ? "h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"
            : "hidden"
        }`}
      >
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <form onSubmit={handleSubmit}>
            {error ? <div className="text-center mb-2 text-red-600">{error}</div> : null}
            {message ? <div>{message}</div> : null}
            <div className="mb-4">
              <h1 className="text-grey-darkest text-center">Todo List</h1>
              <div className="flex mt-4">
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                  id="text"
                  name="Text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Content"
                  maxLength="90"
                />
              </div>
              <div className="flex justify-center items-center">
              <button
                className=" flex-no-shrink px-8 py-2 border-2 rounded text-teal border-teal mt-2 hover:text-white hover:bg-black"
                type="submit"
              >
                Add
              </button>
              </div>
            </div>
          </form>
          
          <TasksList feed={feed} />
        </div>
      </div>
    </Fragment>
  );
}

export default CreateTaskForm;
