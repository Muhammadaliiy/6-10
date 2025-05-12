import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";
import { getTodos } from "./request";
import { Toaster } from "sonner";

function reduserFunction(steate, action) {
  const { type, payload } = action;

  switch (type) {
    case "get":
      return { ...steate, todos: payload, loading: false };

    case "loading":
      return { ...steate, loading: !steate.loading };

    case "error":
      return { ...steate, loading: !steate.loading };

    case "delete":
      return {
        ...steate,
        todos: steate.todos.filter((el) => el.id !== payload),
      };

    case "add":
      return { ...steate, todos: [payload, ...steate.todos] };

    case "filter":
      return { ...steate, filter: payload };

    default:
      return steate;
  }
}
const initialSteate = {
  todos: [],
  loading: false,
  error: null,
  filter: "",
};

export default function App() {
  const [steate, dispatch] = useReducer(reduserFunction, initialSteate);

  useEffect(() => {
    dispatch({ type: "loading" });
    getTodos(steate.filter ? `?priority=${steate.filter}` : "")
      .then((res) => {
        dispatch({ type: "get", payload: res });
      })
      .catch(({ message }) => {
        dispatch({ type: "error", payload: message });
      })
      .finally(() => {});
  }, [steate.filter]);
  return (
    <div>
      <Header dispatch={dispatch} />
      <main>
        <Todos steate={steate} dispatch={dispatch} />
      </main>
      <Toaster />
    </div>
  );
}
