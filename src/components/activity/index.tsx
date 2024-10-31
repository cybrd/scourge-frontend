import { ParentComponent } from "solid-js";
import { Route } from "@solidjs/router";
import { Title } from "@solidjs/meta";

import { Create } from "./create";
import { List } from "./list";
import { Members } from "./members";
import { Update } from "./update";

export const Activity = () => (
  <Route path="/activity" component={ActivityWrapper}>
    <Route path="/" component={List} />
    <Route path="/create" component={Create} />
    <Route path="/:id/members" component={Members} />
    <Route path="/:id" component={Update} />
  </Route>
);

export const ActivityWrapper: ParentComponent = (props) => (
  <div>
    <Title>Activity</Title>
    {props.children}
  </div>
);
