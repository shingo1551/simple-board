import { Component, h } from '@stencil/core';

import { state } from '../../shared/store';
import { A } from '../../shared/components';

@Component({
  tag: 'app-menu',
  styleUrl: 'app-menu.css',
  shadow: true,
})
export class AppMenu {
  render() {
    return (
      <ul>
        {!state.isSignIn ? <A href='/sign-up'>Sign up</A> : null}
        <A href='/sign-in'>{!state.isSignIn ? 'Sign in' : 'Sign out'}</A>

        {state.isSignIn ? <A href='/profile'>Profile</A> : null}
        {state.isSignIn ? <A href='/board'>Board</A> : null}
      </ul>
    );
  }
}
