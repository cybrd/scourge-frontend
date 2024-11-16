import { A, Route } from "@solidjs/router";
import {
  For,
  ParentComponent,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { Title } from "@solidjs/meta";

import { AuthContext } from "../context/auth";
import { MemberWithPoints } from "../models/member";
import { Query } from "../models/query";
import { summary } from "../services/summary";

export const Summary = () => (
  <Route path="/summary" component={SummaryWrapper}>
    <Route path="/" component={List} />
  </Route>
);

export const SummaryWrapper: ParentComponent = (props) => (
  <div>
    <Title>Activity</Title>
    {props.children}
  </div>
);

export const List = () => {
  const auth = useContext(AuthContext);
  const [options, _] = createSignal<Query>({
    token: auth.user()?.token || "",
  });
  const [data, { mutate }] = createResource(() => options(), summary);

  const sortBy = (key: keyof MemberWithPoints) => () => {
    console.log("sortBy", key);

    const sorted = data()?.sort((a, b) => {
      if (typeof a[key] !== "string" && typeof b[key] !== "string") {
        return a[key] - b[key];
      }

      return String(a[key]).localeCompare(String(b[key]));
    });

    console.log(sorted);
    console.log(data());

    mutate([]);
    mutate(sorted);
  };

  return (
    <table class="table table-striped table-hover table-bordered">
      <thead class="sticky-top bg-white p-2">
        <tr>
          <th onClick={sortBy("discord_name")}>Discord Name</th>
          <th onClick={sortBy("ingame_name")}>Ingame Name</th>
          <th onClick={sortBy("available_points")}>Available Points</th>
          <th onClick={sortBy("available_archboss_points")}>
            Available Points (Archboss)
          </th>
          <th onClick={sortBy("total_points")}>Total Points</th>
        </tr>
      </thead>
      <tbody>
        <For each={data()}>
          {(item) => (
            <tr>
              <td>{item.discord_name}</td>
              <td>
                <A href={`/member/${item.id}/activity`}>{item.ingame_name}</A>
              </td>
              <td>{item.available_points}</td>
              <td>{item.available_archboss_points}</td>
              <td>{item.total_points}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
