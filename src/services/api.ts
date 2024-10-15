const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const deleteTodo = async (url: string, { arg }: { arg: { id: string } }) => {
  await delay();

  if (Math.random() > 0.5) {
    throw new Error("Failed to update todo status");
  }

  const response = await fetch(`${url}/${arg.id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

const updateTodoStatus = async (
  url: string,
  { arg }: { arg: { id: string; completed: boolean } }
) => {
  await delay();

  if (Math.random() > 0.5) {
    throw new Error("Failed to update todo status");
  }

  const response = await fetch(`${url}/${arg.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: arg.completed }),
  });
  const data = await response.json();
  return data;
};

export { deleteTodo, updateTodoStatus };
