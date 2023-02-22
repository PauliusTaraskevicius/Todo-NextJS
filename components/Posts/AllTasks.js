import { useSession } from "next-auth/react";

import DeleteBtn from "../Buttons/DeleteBtn";
import CompletionBtn from "../Buttons/CompletionBtn";

function TasksList({ feed }) {
  const { data: session, status } = useSession();

  return (
    <div>
      {feed.length > 0 ? (
        feed.map((item, index) => (
          <div>
            {session.user.email === item.author.email ? (
              <div
                className="flex mb-12 items-center border-b border-gray-200"
                key={index}
              >
                <p
                  className={
                    item.completed
                      ? "w-full text-grey-darkest break-all line-through"
                      : "w-full text-grey-darkest break-all "
                  }
                >
                  {item.text}
                  <br />
                </p>
                <div className="flex mb-2">
                  <CompletionBtn completion={item.completed} id={item.id} />
                  <DeleteBtn id={item.id} />
                </div>
              </div>
            ) : (
              <p>No posts found.</p>
            )}
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
