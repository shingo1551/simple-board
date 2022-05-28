import { Component, State, h, FunctionalComponent } from '@stencil/core';
import { loading } from '../../shared/utils';
import { fetchCors } from '../../shared/fetch';
import { push } from '../../shared/router';

interface Post {
  message: string;
  updatedAt: Date;
  name: string;
}

@Component({
  tag: 'app-board',
  styleUrl: 'app-board.css',
  shadow: true,
})
export class AppBoard {
  @State() loading = true;
  @State() posts = [] as Post[];

  div: HTMLDivElement;
  message: HTMLTextAreaElement;

  async componentDidLoad() {
    try {
      this.posts = this.cnvPosts(await fetchCors('post', 'get'));
      this.scroll();
    } catch {
      push('/sign-in');
    }
  }

  onSend = async () => {
    const body = {
      message: this.message.value,
    }
    this.posts = this.cnvPosts(await fetchCors('post', 'post', body));
    this.message.value = null;
    this.scroll();
  }

  cnvPosts = (posts: { message: string; updatedAt: string; profile: { name: string; } }[]) =>
    posts.map(post => ({ message: post.message, updatedAt: new Date(post.updatedAt), name: post.profile.name }));

  scroll = () => {
    setTimeout(() => {
      window.scroll({ top: this.div.clientHeight, behavior: 'smooth' });
    }, 300);
  }

  render() {
    return loading(
      this,
      <div ref={el => this.div = el}>
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
      </div>
    );
  }
}

const Message: FunctionalComponent<{ post: Post }> = ({ post }) => (
  <div>
    <p><span>{post.name}</span> [{post.updatedAt.toLocaleString()}]</p>
    <p>{post.message}</p>
    <hr />
  </div>
);
