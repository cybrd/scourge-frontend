import { ParentComponent } from "solid-js";
import { Route } from "@solidjs/router";
import { Title } from "@solidjs/meta";

import { Activity } from "./activity";
import { Create } from "./create";
import { List } from "./list";
import { Update } from "./update";

export const Member = () => (
  <Route path="/member" component={MemberWrapper}>
    <Route path="/" component={List} />
    <Route path="/:id/activity" component={Activity} />
  </Route>
);

export const MemberProtected = () => (
  <Route path="/member" component={MemberWrapper}>
    <Route path="/create" component={Create} />
    <Route path="/:id" component={Update} />
  </Route>
);

export const MemberWrapper: ParentComponent = (props) => (
  <div>
    <Title>Member</Title>
    {props.children}
  </div>
);
