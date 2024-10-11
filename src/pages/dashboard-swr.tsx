import { FC } from "react";
import useDashboard from "@/hooks/dashboard";

interface dashboardProps {
  followers: number;
  following: number;
  posts: number;
  likes: number;
}

const Dashboard: FC<dashboardProps> = ({}) => {
  const { data, error, isLoading } = useDashboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h2>Followers: {data.followers}</h2>
      <h2>Following: {data.following}</h2>
      <h2>Posts: {data.posts}</h2>
      <h2>Likes: {data.likes}</h2>
    </div>
  );
};

export default Dashboard;
