import { Component, Host, State, h } from '@stencil/core';

import { loading } from '../../shared/utils';
import { push } from '../../shared/router';
import { fetchCors, signOut } from '../../shared/fetch';

@Component({
  tag: 'app-sign-in',
  styleUrl: 'app-sign-in.css',
  shadow: true,
})
export class AppSignIn {
  @State() loading = true;

  email: HTMLInputElement;
  passwd: HTMLInputElement;
  button: HTMLButtonElement;

  componentDidLoad() {
    signOut();
  }

  onSignIn = async () => {
    const body = {
      email: this.email.value,
      passwd: this.passwd.value
    }
    await fetchCors('signin', 'post', body) as { jwt: string };
    push('board');
  }

  buttonDisabled = () => {
    this.button.disabled = !this.email.value || !this.passwd.value;
  }

  render() {
    return loading(
      this,
      <Host>
        <h2>Sign in</h2>
        <div>
          <input ref={el => this.email = el} onKeyUp={this.buttonDisabled} placeholder='jane@example.com' />
          <input ref={el => this.passwd = el} onKeyUp={this.buttonDisabled} class='error' type='password' placeholder='password' />
        </div>
        <hr />
        <button ref={el => { this.button = el }} onClick={this.onSignIn} disabled>Sign in</button>
      </Host>
    );
  }

}
