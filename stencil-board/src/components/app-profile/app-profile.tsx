import { Component, Host, State, h } from '@stencil/core';
import { loading } from '../../shared/utils';
import { fetchCors } from '../../shared/fetch';
import { state } from '../../shared/store';
import { push } from '../../shared/router';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class AppProfile {
  @State() loading = true;
  @State() profile = state.profile;

  name: HTMLInputElement;
  birth: HTMLInputElement;
  phone: HTMLInputElement;

  async componentDidLoad() {
    try {
      this.profile = await fetchCors('profile', 'get');
      this.loading = false;
    } catch {
      push('/sign-in');
    }
  }

  onApply = async () => {
    const body = {
      name: this.name.value,
      birth: this.birth.value,
      phone: this.phone.value
    }
    await fetchCors('profile', 'put', body);
  }

  render() {
    return loading(
      this,
      <Host>
        <h2>Profile</h2>
        <div>
          <input ref={el => this.name = el} value={this.profile.name} placeholder='山田 太郎' />
          <input ref={el => this.birth = el} value={this.profile.birthDay} type='date' />
          <input ref={el => this.phone = el} value={this.profile.phone} placeholder='090-123-4567' />
        </div>
        <hr />
        <button onClick={this.onApply}>Apply</button>
      </Host>
    );
  }
}
