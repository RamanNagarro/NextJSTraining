import useSWR from "swr";

const useTodos = () => {
  return useSWR("http://localhost:4000/todos");
};

export { useTodos };
