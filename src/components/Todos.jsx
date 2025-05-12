import Todo from "./Todo";
import Loading from "./Loading";

export default function Todos({ steate, dispatch }) {
  const { todos, error, loading } = steate;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 px-5">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10 px-5">
        <p>{error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 px-5">
        <p>NO DATA</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 container mx-auto px-5 py-10">
      {todos.map(({ completed, id, priority, title }) => {
        return (
          <Todo
            completed={completed}
            title={title}
            priority={priority}
            id={id}
            key={id}
            dispatch={dispatch}
          />
        );
      })}
    </div>
  );
}
