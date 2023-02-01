import { useState } from "react";
import Router from "next/router";

function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (title && text) {
      // send request to the server.
      try {
        const body = { title, text };
        await fetch(`/api/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        await Router.push("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("All fields are required");
      return;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error ? <div>{error}</div> : null}
        {message ? <div>{message}</div> : null}
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            cols={50}
            name="text"
            placeholder="text"
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskForm;
