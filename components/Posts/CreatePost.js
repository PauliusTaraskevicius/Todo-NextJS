import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import { motion } from "framer-motion";

import TasksList from "./AllTasks";

function CreateTaskForm({ feed }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState("false");

  const router = useRouter();

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

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
      <div className=" flex items-center justify-center">
        <button
          className="flex-no-shrink px-8 py-2 mt-2 border border-white text-white font-medium rounded-xl hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Open Todo's"}
        </button>
      </div>

      <div
        className={`mobile-menu ${
          open ? "w-full flex items-center justify-center " : "hidden"
        }`}
      >
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <form onSubmit={handleSubmit}>
            {error ? (
              <div className="text-center mb-2 text-red-600">{error}</div>
            ) : null}
            {message ? (
              <div className="text-center mb-2 text-green-600">{message}</div>
            ) : null}
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
                  maxLength="78"
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="flex-no-shrink px-8 py-2 mt-2 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <motion.nav animate={open ? "open" : "closed"} variants={variants}>
            <TasksList feed={feed} />
          </motion.nav>
        </div>
      </div>
    </Fragment>
  );
}

export default CreateTaskForm;
