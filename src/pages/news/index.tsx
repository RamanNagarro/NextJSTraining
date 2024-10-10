import { FC } from "react";
// import Link from "next/link";
import { GetServerSideProps } from "next";

interface NewsProps {
  News: [
    {
      id: number;
      title: string;
      description: string;
      category: string;
    }
  ];
}

const NewsList: FC<NewsProps> = ({ News }) => {
  return (
    <div>
      <h1>News</h1>
      <ul>
        {News.map((newsItem) => (
          // <Link href={`/News/${product.id}`} key={product.id}>
          <li key={newsItem.id}>
            <h2>{newsItem.category}</h2>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.description}</p>
            <br></br>
            <hr />
          </li>
          // </Link
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  console.log("params: ", params);
  const response = await fetch("http://localhost:4000/news");
  const data = await response.json();
  return {
    props: {
      News: data,
    },
  };
};

export default NewsList;
