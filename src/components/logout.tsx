import Cookies from "universal-cookie";
import { useContext } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { AuthContext } from "../context/auth";

const cookies = new Cookies(null, { path: "/" });

export const Logout = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  cookies.set("user", {});
  auth.setUser({});
  navigate("/login");

  return <div></div>;
};
