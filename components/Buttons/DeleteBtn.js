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
      className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
      onClick={() => deleteTask(id)}
    >
      {loading ? "Loading..." : "Remove"}
    </button>
  );
}

export default DeleteBtn;
