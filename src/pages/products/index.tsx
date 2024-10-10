import { FC } from "react";
// import Link from "next/link";

interface ProductsProps {
  products: [
    {
      id: number;
      title: string;
      price: number;
      description: string;
    }
  ];
}

const ProductsList: FC<ProductsProps> = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          // <Link href={`/products/${product.id}`} key={product.id}>
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <br></br>
            <hr />
          </li>
          // </Link
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  console.log("generated / regenerated page");
  const response = await fetch("http://localhost:4000/products");
  const data = await response.json();
  return {
    props: {
      products: data,
    },
    revalidate: 60,
  };
}

export default ProductsList;
