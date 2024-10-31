import { ParentComponent, Show, useContext } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { AuthContext } from "../context/auth";
import { FilterOptionsContext } from "../context/filter-options";
import { Menu } from "./menu";
import { filterOptionsList } from "../services/filter-options";

export const Protected: ParentComponent = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const filter = useContext(FilterOptionsContext);
  const username = auth.user()?.username;

  if (!username) {
    console.log("to login");
    navigate("/login");
  }

  if (
    !filter.filterOptions().department ||
    !Object.keys(filter.filterOptions().department).length
  ) {
    filterOptionsList(auth.user()?.token)
      .then((res) => filter.setFilterOptions(res))
      .catch(console.error);
  }

  return (
    <div class="d-flex">
      <div class="sticky-top h-100">
        <Menu />
      </div>

      <div class="flex-fill">
        <Show when={Object.keys(filter.filterOptions().department).length}>
          {props.children}
        </Show>
      </div>
    </div>
  );
};
