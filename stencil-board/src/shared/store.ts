import { createStore } from '@stencil/store';

const storage = localStorage;

export const { state } = createStore({
  jwt: null,
  isSignIn: false,
  profile: {} as Profile
});

export interface Profile {
  userId: number;
  name: string;
  birthDay: string;
  phone: string;
}

export function signIn(json: { jwt: string; profile: Profile }) {
  const profile = json.profile ? json.profile : {} as Profile;
  if (json.jwt) {
    state.jwt = json.jwt;
    state.profile = profile;
    state.isSignIn = !!profile;
    saveStorage();
  }
}

export function signOut() {
  state.jwt = null;
  state.isSignIn = false;
  state.profile = {} as Profile;
  saveStorage();
}

//
function loadStorage() {
  const str = storage.getItem('state');
  if (str) {
    const o = JSON.parse(str);
    state.jwt = o.jwt;
    state.profile = o.profile;
    state.isSignIn = o.isSignIn
  }
}

function saveStorage() {
  const o = {
    jwt: state.jwt,
    profile: state.profile,
    isSignIn: state.isSignIn,
  };
  storage.setItem('state', JSON.stringify(o));
}

//
loadStorage();
