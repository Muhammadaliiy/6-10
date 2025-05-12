const baseUrl = import.meta.env.VITE_BASE_URL;

export async function getTodos(querry = "") {
  const req = await fetch(baseUrl + "/todos" + querry);

  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("Erorr");
  }
}

export async function addTodo(todo) {
  const req = await fetch(baseUrl + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Erorr");
  }
}

export async function deleteTodo(id) {
  const req = await fetch(baseUrl + "/todos/" + id, {
    method: "DELETE",
  });

  if (req.status === 200) {
    return id;
  } else {
    throw new Error("Erorr");
  }
}

export function validation(obj) {
  if (obj.title.trim().length < 5) {
    return { target: "title", message: "Sarlavha bo'sh bo'lishi mumkin emas" };
  }
  return false;
}
