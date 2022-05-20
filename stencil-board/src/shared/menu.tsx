import { FunctionalComponent, h } from '@stencil/core';
import { href } from '@stencil/router';
import { Router } from './router';

export const A: FunctionalComponent<{ href: string; onClick?: (e: MouseEvent) => void }> = (props, children) =>
  <li class={{ selected: Router.path === props.href }}>
    {props.onClick
      ? <a {...href(props.href)} onClick={props.onClick}>{children}</a>
      : <a {...href(props.href)} >{children}</a>}
  </li>;
