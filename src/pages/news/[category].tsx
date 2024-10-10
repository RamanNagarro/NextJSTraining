import { FC } from "react";
import { GetServerSideProps } from "next";

interface CategoryProps {
  articles: [
    {
      id: number;
      title: string;
      description: string;
    }
  ];
  category: string;
}

const NewsByCategory: FC<CategoryProps> = ({ articles, category }) => {
  return (
    <>
      <h1>Showing news for category {category}</h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <h2>
              {article.id} {article.title}
            </h2>
            <p>{article.description}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, res, req, query } = context;
  console.log("params: ", params);
  console.log("query: ", query);
  const response = await fetch(
    `http://localhost:4000/news?category=${params?.category}`
  );
  const data = await response.json();

  res.setHeader("set-cookie", ["name=nextjs"]);
  console.log("req.cookies: ", req.headers.cookie);
  return {
    props: {
      articles: data,
      category: params?.category,
    },
  };
};

export default NewsByCategory;
