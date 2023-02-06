import { useState } from "react";
import { useRouter } from "next/router";
import CreateTaskForm from "./CreatePost";

function TasksList({ feed }) {
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <div className="mb-10">
        <CreateTaskForm />
      </div>
      <title>Tasks</title>
      {feed.length > 0 ? (
        feed.map((item, index) => (
          <div className="mb-5" key={index}>
            <h1 className="font-bold uppercase">{item.title}</h1>
            <p>{item.text}</p>
            <p>{item.author.name}</p>
            <div>
              <button onClick={() => deleteTask(item.id)}>
                {loading ? "Loading..." : "Delete"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>No posts found.</p>
        </div>
      )}
    </div>
  );
}

export default TasksList;
