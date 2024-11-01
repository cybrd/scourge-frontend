import { Route, Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import { render } from "solid-js/web";

import "bootstrap/scss/bootstrap.scss";
import "./index.scss";

import { NotProtected, Protected } from "./components/protected";
import { AuthProvider } from "./context/auth";

import { Login } from "./components/login";
import { Logout } from "./components/logout";

import { Activity, ActivityProtected } from "./components/activity";
import { Member, MemberProtected } from "./components/member";
import { Home } from "./components/home";
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
            <Route component={Protected}>
              <ActivityProtected />
              <MemberProtected />
            </Route>

            <Route component={NotProtected}>
              <Activity />
              <Member />
              <Summary />
              <Route path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
            </Route>
          </AuthProvider>
        </Router>
      </MetaProvider>
    </div>
  ),
  root
);
