import { Component, Host, State, h, FunctionalComponent } from '@stencil/core';
import { loading } from '../../shared/utils';
import { fetchCors } from '../../shared/fetch';

interface Post {
  message: string;
  updatedAt: string;
  profile: {
    name: string;
  }
}

@Component({
  tag: 'app-board',
  styleUrl: 'app-board.css',
  shadow: true,
})
export class AppBoard {
  @State() loading = true;
  @State() posts = [] as Post[];

  message: HTMLTextAreaElement;

  async componentDidLoad() {
    this.posts = await fetchCors('post', 'get');
  }

  onSend = async () => {
    const body = {
      message: this.message.value,
    }
    this.posts = await fetchCors('post', 'post', body);
    this.message.value = null;
  }

  render() {
    return loading(
      this,
      <Host>
        <h2>Board</h2>
        <div>
          {this.posts.map(post => <Message post={post} />)}
        </div>
        <div class='bottom'>
          <div>
            <textarea ref={el => this.message = el} ></textarea>
          </div>
          <button onClick={this.onSend}>Send</button>
        </div>
      </Host>
    );
  }
}

const Message: FunctionalComponent<{ post: Post }> = ({ post }) => (
  <div>
    <p><span>{post.profile.name}</span>{post.updatedAt}</p>
    <p>{post.message}</p>
    <hr />
  </div>
);
