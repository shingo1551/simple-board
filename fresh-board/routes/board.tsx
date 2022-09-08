/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { PageProps } from "$fresh/server.ts";

import Head from '../components/Head.tsx';
import Body from "../components/Body.tsx";
import Board from '../islands/Board.tsx';

export default function Index(props: PageProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Welcome to the Fresh Board." />
        <title>Fresh Board</title>
      </Head>
      <Body>
        <Board />
      </Body>
    </>
  );
}
