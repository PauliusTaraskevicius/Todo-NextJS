import { useState } from "react";
import { useRouter } from "next/router";

function DeleteBtn({ id }) {
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
    <button
      className="flex-no-shrink p-2 ml-2 border-2 rounded-lg  hover:text-black"
      onClick={() => deleteTask(id)}
    >
      {loading ? (
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
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      ) : (
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
}

export default DeleteBtn;
