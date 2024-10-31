import { ParentComponent } from "solid-js";
import { Route } from "@solidjs/router";
import { Title } from "@solidjs/meta";

import { Create } from "./create";

export const Activity = () => (
  <Route path="/activity" component={ActivityWrapper}>
    <Route path="/create" component={Create} />
  </Route>
);

export const ActivityWrapper: ParentComponent = (props) => (
  <div>
    <Title>Activity</Title>
    {props.children}
  </div>
);
