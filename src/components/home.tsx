import { type Component } from "solid-js";

import { useNavigate } from "@solidjs/router";

export const Home: Component = () => {
  const navigate = useNavigate();
  navigate("/activity");

  return <></>;
};
