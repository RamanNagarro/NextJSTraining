import { FC, useState, useEffect } from "react";

interface dashboardProps {
  followers: number;
  following: number;
  posts: number;
  likes: number;
}

const Dashboard: FC<dashboardProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<dashboardProps>({
    followers: 0,
    following: 0,
    posts: 0,
    likes: 0,
  });

  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch("http://localhost:4000/dashboard");
      const data = await response.json();

      setDashboardData(data);
      setIsLoading(false);
    }

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h2>{dashboardData.followers}</h2>
      <h2>{dashboardData.following}</h2>
      <h2>{dashboardData.posts}</h2>
      <h2>{dashboardData.likes}</h2>
    </div>
  );
};

export default Dashboard;
