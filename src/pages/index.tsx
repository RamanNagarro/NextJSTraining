import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Next JS pre rendering tutorial!</h1>
      <br />

      <Link href="/users">Go to users page</Link>
    </>
  );
}
