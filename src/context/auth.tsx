import {
  Accessor,
  ParentProps,
  Setter,
  createContext,
  createSignal,
} from "solid-js";
import Cookies from "universal-cookie";

import { User } from "../models/user";

const cookies = new Cookies(null, { path: "/" });

const providerValue = () => {
  const [user, setUser] = createSignal<Partial<User>>(cookies.get("user"));

  return { setUser, user };
};

export const AuthContext = createContext<{
  setUser: Setter<Partial<User>>;
  user: Accessor<Partial<User>>;
}>(providerValue());

export const AuthProvider = (props: ParentProps) => (
  <AuthContext.Provider value={providerValue()}>
    {props.children}
  </AuthContext.Provider>
);
