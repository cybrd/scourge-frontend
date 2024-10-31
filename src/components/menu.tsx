import { type Component, useContext } from "solid-js";
import { A } from "@solidjs/router";
import { AuthContext } from "../context/auth";

export const Menu: Component = () => {
  const auth = useContext(AuthContext);

  return (
    <div class="text-nowrap p-2 d-print-none">
      <div>
        <A href="/">Home</A>
      </div>
      {auth.user().role === "admin" && (
        <div>
          <A href="/admins">Admins</A>
        </div>
      )}
      <div>
        <A href="/logout">Logout</A>
      </div>
    </div>
  );
};
