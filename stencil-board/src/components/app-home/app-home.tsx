import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  connectedCallback() {
    document.title = 'Simple Board | Home';
    const description = document.querySelector('meta[name="Description"]') as HTMLMetaElement;
    description.content = 'DESCRIPTION';
  }

  render() {
    return (
      <Host>Home</Host>
    );
  }
}
