import { Component, h } from '@stencil/core';
import { Route } from '@stencil/router';
import { Router } from '../../shared/router';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <h1>Stencil Board</h1>
        </header>

        <main>
          <app-menu></app-menu>

          <Router.Switch>
            <Route path='/'>
              <app-home></app-home>
            </Route>

            <Route path='/sign-in'>
              <app-sign-in />
            </Route>
            <Route path='/sign-up'>
              <app-sign-up />
            </Route>

            <Route path='/board'>
              <app-board />
            </Route>
            <Route path='/profile'>
              <app-profile />
            </Route>

            <Route path='/404'>Not Found</Route>
            <Route path={/./} to='/404'></Route>
          </Router.Switch>
        </main>
      </div>
    );
  }
}
