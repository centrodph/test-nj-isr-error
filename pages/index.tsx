import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test NJ: 02282023</title>
        <meta name="description" content="Test NJ: 02282023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Test NJ: 02282023</h1>
      <ul>
        <li>
          <Link href="/list">list</Link>
        </li>
      </ul>
    </div>
  );
}
