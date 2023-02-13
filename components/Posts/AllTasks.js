import { useState } from "react";
import { useRouter } from "next/router";

function TasksList({ feed }) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const router = useRouter();

  async function deleteTask(taskId) {
    try {
      setLoading(true);
      await fetch("/api/post/delete?id=" + taskId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);
      await router.push("/");
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }

  async function todoDone(taskId) {
    if (!completed) {
      // send request to the server.
      try {
        const body = { completed };
        await fetch("/api/post/editTrue?id=" + taskId, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        await router.push('/');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("All fields are required");
      return;
    }
  }

  async function todoUnfinished(taskId) {
    if (!completed) {
      // send request to the server.
      try {
        const body = { completed };
        await fetch("/api/post/editFalse?id=" + taskId, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        await router.push("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("All fields are required");
      return;
    }
  }

  return (
    <div>
      {feed.length > 0 ? (
        feed.map((item, index) => (
          <div className="flex mb-12 items-center" key={index}>
            <p className="w-full text-grey-darkest break-all">{item.text}</p>
            <button
              className={
                item.completed
                  ? "bg-green-600 flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
                  : "bg-red-600 flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
              }
              onClick={() =>
                item.completed ? todoUnfinished(item.id) : todoDone(item.id)
              }
            >
              Done
            </button>

            <button
              className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
              onClick={() => deleteTask(item.id)}
            >
              {loading ? "Loading..." : "Remove"}
            </button>
          </div>
        ))
      ) : (
        <div classNameName="text-center">
          <p>No posts found.</p>
        </div>
      )}
    </div>
  );
}

export default TasksList;
