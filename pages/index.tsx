import Head from 'next/head'
import styles from '../styles/Home/Home.module.css'
import NextLink from "next/link"

export default function Home() {
  return (
    <main className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextLink href="/game">
        <p style={{ color: "white" }}>play game</p>
      </NextLink>
    </main>
  )
}
