/** @jsx h */
import { h } from "preact";
import A from '../components/A.tsx';

export default function Menu() {
  return (
    <ul class="menu">
      <A href='/sign-up'>Sign up</A>
      <A href='/sign-in'>Sign in</A>

      <A href='/profile'>Profile</A>
      <A href='/board'>Board</A>
    </ul>
  );
}
