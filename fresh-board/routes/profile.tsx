/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { PageProps } from "$fresh/server.ts";

import Head from '../components/Head.tsx';
import Common from "../components/Common.tsx";

export default function Index(props: PageProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Welcome to the Fresh Board." />
        <title>Fresh Board</title>
      </Head>
      <Common>
        <h1>Profile</h1>
      </Common>
    </>
  );
}
