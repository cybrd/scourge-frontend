import { Route, Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import { render } from "solid-js/web";

import "bootstrap/scss/bootstrap.scss";
import "./index.scss";

import { AuthProvider } from "./context/auth";
import { Protected } from "./components/protected";

import { Login } from "./components/login";
import { Logout } from "./components/logout";

import { Activity, ActivityProtected } from "./components/activity";
import { Member, MemberProtected } from "./components/member";
import { List as ActivityList } from "./components/activity/list";
import { Summary } from "./components/summary";

const root = document.getElementById("root") as HTMLElement;

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <div class="container-fluid">
      <MetaProvider>
        <Router>
          <AuthProvider>
            <Route path="/" component={ActivityList} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={Protected}>
              <ActivityProtected />
              <MemberProtected />
            </Route>

            <Activity />
            <Member />
            <Summary />
          </AuthProvider>
        </Router>
      </MetaProvider>
    </div>
  ),
  root
);
