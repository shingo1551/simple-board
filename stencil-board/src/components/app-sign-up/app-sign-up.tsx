import { Component, Host, State, h } from '@stencil/core';

import { loading } from '../../shared/utils';
import { fetchCors } from '../../shared/fetch';

@Component({
  tag: 'app-sign-up',
  styleUrl: 'app-sign-up.css',
  shadow: true,
})
export class AppSignUp {
  @State() loading = true;

  @State() errEmail = false;
  @State() errPass1 = false;
  @State() errPass2 = false;

  email: HTMLInputElement;
  passwd1: HTMLInputElement;
  passwd2: HTMLInputElement;
  button: HTMLButtonElement;

  onSignUp = async () => {
    const body = {
      email: this.email.value,
      passwd: this.passwd1.value
    }
    await fetchCors('signup', 'post', body);
  }

  onEmail = () => {
    this.errEmail = !this.email.value;
    this.buttonDisabled();
  }

  onPasswd1 = () => {
    this.errPass1 = !this.passwd1.value;
    this.onPasswd2();
  }

  onPasswd2 = () => {
    this.errPass2 = this.passwd1.value !== this.passwd2.value;
    this.buttonDisabled();
  }

  buttonDisabled = () => {
    this.button.disabled = this.errEmail || this.errPass1 || this.errPass2 || !this.passwd1.value;
  }

  render() {
    return loading(
      this,
      <Host>
        <h2>Sign up</h2>
        <div>
          <input ref={el => this.email = el} onKeyUp={this.onEmail} placeholder='jane@example.com' />
          {/* <span class='error'>This field is required.</span> */}
          <input ref={el => this.passwd1 = el} onKeyUp={this.onPasswd1} class='error' type='password' placeholder='password' />
          {/* <span class='error'>This field is required.</span> */}
          <input ref={el => this.passwd2 = el} onKeyUp={this.onPasswd2} type='password' placeholder='password confirm' />
          {/* <span class='error'>This field is required.</span> */}
        </div>
        <hr />
        <button ref={el => { this.button = el }} onClick={this.onSignUp} disabled>Sign up</button>
      </Host>
    );
  }

}
