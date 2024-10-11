import useSWR from "swr";

const fetchDashboardData = async () => {
  const response = await fetch("http://localhost:4000/dashboard");
  const data = await response.json();
  return data;
};

const useDashboard = () => {
  const { data, error, isLoading } = useSWR("dashboard", fetchDashboardData);
  return {
    data,
    error,
    isLoading,
  };
};

export default useDashboard;
