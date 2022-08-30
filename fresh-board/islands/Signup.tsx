/** @jsx h */
import { ComponentChildren, h } from "preact";
import { useRef, useState } from 'preact/hooks';

export default function Signup() {
  const email = useRef(null);
  const passwd1 = useRef(null);
  const passwd2 = useRef(null);

  const [error, setError] = useState(null);
  const [errEmail, setErrEmail] = useState(false);
  const [errPass1, setErrPasswd1] = useState(false);
  const [errPass2, setErrPasswd2] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onEmail = () => {
    setErrEmail(!email);
    buttonDisabled();
  };

  const onPasswd1 = () => {
    setErrPasswd1(!passwd1);
    onPasswd2();
  };

  const onPasswd2 = () => {
    setErrPasswd2(passwd1 !== passwd2);
    buttonDisabled();
  };

  const onSignUp = () => { };

  const buttonDisabled = () => {
    setDisabled(errEmail || errPass1 || errPass2 || !passwd1);
  };

  return (
    <form class="signup">
      <h1>Sign up</h1>
      <div>
        <Error>{error}</Error>
        <input ref={email} onInput={onEmail} autocomplete="username" placeholder="jane@example.com" />
        {/* <span class='error'>This field is required.</span> */}
        <input ref={passwd1} onInput={onPasswd1} type="password" autocomplete="new-password" placeholder="password" />
        {/* <span class='error'>This field is required.</span> */}
        <input ref={passwd2} onInput={onPasswd2} type="password" autocomplete="new-password" placeholder="password confirm" />
        {/* <span class='error'>This field is required.</span> */}
      </div>
      <hr />
      <button onClick={onSignUp} disabled={disabled}>Sign up</button>
    </form>
  );
}

function Error(props: { children: ComponentChildren }) {
  return props.children ? <div>{props.children}</div> : null;
}
