import { FC } from "react";
import UsersComponent from "../components/users";

interface usersProps {
  users: [
    {
      id: number;
      name: string;
      username: string;
      email: string;
      address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
          lat: string;
          lng: string;
        };
      };
      phone: string;
      website: string;
      company: {
        name: string;
        catchPhrase: string;
        bs: string;
      };
    }
  ];
}

const users: FC<usersProps> = ({ users }) => {
  console.log("this is client side rendering");
  return <UsersComponent users={users} />;
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return {
    props: {
      users: data.slice(0, 3),
    },
  };
}

export default users;
