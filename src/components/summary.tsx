import { A, Route } from "@solidjs/router";
import {
  Index,
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

    mutate(sorted);
  };

  return (
    <table class="table table-striped table-hover table-bordered">
      <thead class="sticky-top bg-white p-2">
        <tr>
          <th onClick={sortBy("discord_name")}>Discord Name</th>
          <th>Ingame Name</th>
          <th>Available Points</th>
          <th>Available Points (Archboss)</th>
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        <Index each={data()}>
          {(item) => (
            <tr>
              <td>{item().discord_name}</td>
              <td>
                <A href={`/member/${item().id}/activity`}>
                  {item().ingame_name}
                </A>
              </td>
              <td>{item().available_points}</td>
              <td>{item().available_archboss_points}</td>
              <td>{item().total_points}</td>
            </tr>
          )}
        </Index>
      </tbody>
    </table>
  );
};
