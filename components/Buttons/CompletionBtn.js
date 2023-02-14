import { useState } from "react";
import { useRouter } from "next/router";

function CompletionBtn({ id, completion }) {
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

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

        await router.push("/");
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
    <button
      className={
        completion
          ? "bg-green-600 flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
          : "bg-red-600 flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      }
      onClick={() =>
        completion ? todoUnfinished(id) : todoDone(id)
      }
    >
      {completion ? "Done" : "Finish"}
    </button>
  );
}

export default CompletionBtn;
