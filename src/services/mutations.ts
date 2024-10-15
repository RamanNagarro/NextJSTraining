import useSWRMutation from "swr/mutation";
import { deleteTodo, updateTodoStatus } from "./api";
import { useTodos } from "./queries";

const useDeleteTodo = () => {
  const { mutate } = useTodos();
  return useSWRMutation("http://localhost:4000/todos", deleteTodo, {
    onSuccess: () => {
      console.log("Todo deleted successfully");
      mutate();
    },
  });
};

const useUpdateTodo = () => {
  const { mutate } = useTodos();
  return useSWRMutation("http://localhost:4000/todos", updateTodoStatus, {
    onSuccess: () => {
      console.log("Todo deleted successfully");
      mutate();
    },
  });
};

export { useDeleteTodo, useUpdateTodo };
