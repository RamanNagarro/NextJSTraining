import { FC } from "react";

import { useTodos } from "@/services/queries";
import { useDeleteTodo, useUpdateTodo } from "@/services/mutations";

interface todoProps {
  id: string;
  title: string;
  completed: boolean;
}

const TodosComponent: FC<void> = () => {
  const { data: todoList, isLoading, error } = useTodos();
  const { trigger: deleteTodo } = useDeleteTodo();
  const { trigger: updateTodo } = useUpdateTodo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  const handleDeleteTodo = async (id: string) => {
    deleteTodo(
      { id },
      {
        optimisticData: () => {
          return todoList.filter((todo: todoProps) => {
            return todo.id !== id;
          });
        },
        rollbackOnError: true,
        throwOnError: false,
      }
    );
  };

  const handleMarkComplete = async (id: string) => {
    updateTodo(
      {
        id,
        completed: true,
      },
      {
        optimisticData: () => {
          return todoList.map((todo: todoProps) => {
            if (todo.id === id) {
              return {
                ...todo,
                completed: true,
              };
            }
            return todo;
          });
        },
        rollbackOnError: true,
        throwOnError: false,
      }
    );
  };

  const handleMarkInComplete = async (id: string) => {
    updateTodo(
      {
        id,
        completed: false,
      },
      {
        optimisticData: () => {
          return todoList.map((todo: todoProps) => {
            if (todo.id === id) {
              return {
                ...todo,
                completed: false,
              };
            }
            return todo;
          });
        },
        rollbackOnError: true,
        throwOnError: false,
      }
    );
  };

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todoList.map((todo: todoProps) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border-b"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="mr-2"
              />
              <h2 className="text-xl font-semibold">{todo.title}</h2>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
              {todo.completed || (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleMarkComplete(todo.id)}
                >
                  Mark Completed
                </button>
              )}
              {todo.completed && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => handleMarkInComplete(todo.id)}
                >
                  Mark Incomplete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosComponent;
