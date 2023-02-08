import { useState } from "react";
import { useRouter } from "next/router";

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
      {feed.length > 0 ? (
        feed.map((item, index) => (
          <div class="flex mb-12 items-center" key={index}>
            <p class="w-full text-grey-darkest break-all">{item.text}</p>
            <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
              Done
            </button>
            <button
              class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
              onClick={() => deleteTask(item.id)}
            >
              {loading ? "Loading..." : "Remove"}
            </button>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p>No posts found.</p>
        </div>
      )}
    </div>
  );
}

export default TasksList;
