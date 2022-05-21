import { Component, Host, State, h } from '@stencil/core';
import { loading } from '../../shared/utils';
import { fetchCors, state } from '../../shared/fetch';

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

  onApply = async () => {
    const body = {
      name: this.name.value,
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
          <input ref={el => this.birth = el} type='date' />
          <input ref={el => this.phone = el} value={this.profile.phone} placeholder='090-123-4567' />
        </div>
        <hr />
        <button onClick={this.onApply}>Apply</button>
      </Host>
    );
  }
}
