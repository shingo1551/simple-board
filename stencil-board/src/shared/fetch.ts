import { Profile, signIn, state } from './store';

const baseUrl = 'http://localhost:8080/';

export async function fetchCors(url: string, method: string, body = undefined) {
  const headers = state.jwt ? [['Authorization', 'Bearer ' + state.jwt]] : undefined;

  const o = body ? JSON.stringify(body) : undefined;
  const req = {
    method: method,
    headers: headers,
    mode: 'cors' as RequestMode,
    cache: 'no-cache' as RequestCache,
    body: o
  } as RequestInit;

  const res = (await fetch(baseUrl + url, req));
  if (!res.headers.get('content-type').startsWith('application/json;'))
    throw await res.text();

  const json = await res.json() as { jwt: string; profile: Profile };
  if ('sign-in' === url)
    signIn(json);

  return json as any;
}
