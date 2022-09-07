/** @jsx h */
import { h } from "preact";
import A from '../components/A.tsx';

export default function Menu() {
  return (
    <ul class="menu">
      <A href='/signup'>Sign up</A>
      <A href='/signin'>Sign in</A>

      <A href='/profile'>Profile</A>
      <A href='/board'>Board</A>
    </ul>
  );
}
