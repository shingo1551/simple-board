import { createStore } from '@stencil/store';

export const { state } = createStore({
  isSignIn: false
});

interface Profile {
  userId: number;
  name: string;
  birthDay: string;
  phone: string;
}

//
const baseUrl = 'http://localhost:8080/'
export let profile = {} as Profile;
let jwt = null;

//
export async function fetchCors(url: string, method: string, body = undefined) {
  const headers = jwt ? [['Authorization', 'Bearer ' + jwt]] : undefined;

  const o = body ? JSON.stringify(body) : undefined;
  const req = {
    method: method,
    headers: headers,
    mode: 'cors' as RequestMode,
    cache: 'no-cache' as RequestCache,
    body: o
  } as RequestInit;

  const res = (await fetch(baseUrl + url, req));
  const json = await res.json() as { jwt: string; profile: Profile };
  signIn(json);

  return json as any;
}

function signIn(json: { jwt: string; profile: Profile }) {
  profile = json.profile ? json.profile : {} as Profile;
  if (json.jwt) {
    jwt = json.jwt;
    state.isSignIn = !!profile;
  }
}

export function signOut() {
  state.isSignIn = false;
  profile = {} as Profile;
  jwt = null;
}
