import { type Component, createSignal, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import Cookies from "universal-cookie";
import { useNavigate } from "@solidjs/router";

import { User } from "../models/user";

import { AuthContext } from "../context/auth";
import { userLogin } from "../services/user";

const cookies = new Cookies(null, { path: "/" });

const usernameInput = (setFields: SetStoreFunction<Partial<User>>) => (
  <div class="mb-3">
    <label for="inputEmail" class="form-label">
      Username
    </label>
    <input
      id="inputEmail"
      class="form-control"
      onInput={(e) => setFields("username", e.target.value)}
    />
  </div>
);

const passwordInput = (setFields: SetStoreFunction<Partial<User>>) => (
  <div class="mb-3">
    <label for="inputPassword" class="form-label">
      Password
    </label>
    <input
      type="password"
      id="inputPassword"
      class="form-control"
      onInput={(e) => setFields("password", e.target.value)}
    />
  </div>
);

const showError = (error: string) => {
  if (error) {
    return <div class="mb-3">{error}</div>;
  }

  return <></>;
};

export const Login: Component = () => {
  const [fields, setFields] = createStore<Partial<User>>({});
  const [error, setError] = createSignal("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    userLogin(fields.username || "", fields.password || "")
      .then((res: User) => {
        cookies.set("user", res);
        auth.setUser(res);
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
        setError(e);
      });
  };

  return (
    <div class="w-25">
      <form onSubmit={submit}>
        {usernameInput(setFields)}
        {passwordInput(setFields)}

        <button type="submit" class="btn btn-primary">
          Submit
        </button>

        {showError(error())}
      </form>
    </div>
  );
};
