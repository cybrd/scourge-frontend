import { ParentComponent, useContext } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { AuthContext } from "../context/auth";
import { Menu } from "./menu";

export const NotProtected: ParentComponent = (props) => (
  <div class="d-flex">
    <div class="sticky-top h-100">
      <Menu />
    </div>

    <div class="flex-fill">{props.children}</div>
  </div>
);

export const Protected: ParentComponent = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const username = auth.user()?.username;

  if (!username) {
    console.log("to login");
    navigate("/login");
  }

  return (
    <div class="d-flex">
      <div class="sticky-top h-100">
        <Menu />
      </div>

      <div class="flex-fill">{props.children}</div>
    </div>
  );
};
