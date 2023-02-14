import DeleteBtn from "../Buttons/DeleteBtn";
import CompletionBtn from "../Buttons/CompletionBtn";

function TasksList({ feed }) {
  return (
    <div>
      {feed.length > 0 ? (
        feed.map((item, index) => (
          <div className="flex mb-12 items-center" key={index}>
            <p
              className={
                item.completed
                  ? "w-full text-grey-darkest break-all line-through"
                  : "w-full text-grey-darkest break-all"
              }
            >
              {item.text}
            </p>
            <CompletionBtn completion={item.completed} id={item.id} />
            <DeleteBtn id={item.id} />
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
