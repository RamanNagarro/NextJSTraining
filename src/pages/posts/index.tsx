import { FC } from "react";
import Link from "next/link";

interface postProps {
  posts: [
    {
      id: number;
      title: string;
      body: string;
    }
  ];
}

const PostList: FC<postProps> = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <br></br>
              <hr />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log("data: ", data);
  return {
    props: {
      posts: data.slice(0, 3),
    },
  };
}

export default PostList;
