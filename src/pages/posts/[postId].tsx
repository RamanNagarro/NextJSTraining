import { FC } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

interface Props {
  post: {
    id: number;
    title: string;
    body: string;
    userId: number;
  };
}

const Post: FC<Props> = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h3>
        {post.id} {post.title}
      </h3>
      <p>{post.body}</p>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { postId: "1" } },
      { params: { postId: "2" } },
      { params: { postId: "3" } },
    ],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.postId}`
  );
  const data = await response.json();
  if (Object.keys(data).length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: data,
    },
  };
};

export default Post;
