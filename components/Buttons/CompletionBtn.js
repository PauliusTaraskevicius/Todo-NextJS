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

        await router.push('/');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("All fields are required");
      return;
    }
  }

  async function todoUnfinished(taskId, ) {
    if (!completed) {
      // send request to the server.
      try {

        const body = { completed };
        await fetch("/api/post/editFalse?id=" + taskId, {
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

  return (
    <button
      className={
        completion
          ? "bg-green-600 flex-no-shrink p-2 ml-4 mr-2 border-2 rounded-lg hover:text-white"
          : "bg-red-600 flex-no-shrink p-2 ml-4 mr-2 border-2  rounded-lg hover:text-white"
      }
      onClick={() => (completion ? todoUnfinished(id) : todoDone(id))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </button>
  );
}

export default CompletionBtn;
