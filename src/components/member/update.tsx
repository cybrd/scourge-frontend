import { Resource, Show, createResource, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";

import { memberGet, memberUpdate } from "../../services/member";
import { AuthContext } from "../../context/auth";
import { Member } from "../../models/member";

const inputDiscordName = (
  data: Resource<Member>,
  setFields: SetStoreFunction<Partial<Member>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputDiscordName" class="col-sm-2 form-label text-end">
      Discord Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputDiscordName"
        class="form-control"
        onInput={(e) => setFields("discord_name", e.target.value)}
        value={data()?.discord_name}
      />
    </div>
  </div>
);

const inputIngameName = (
  data: Resource<Member>,
  setFields: SetStoreFunction<Partial<Member>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputIngameName" class="col-sm-2 form-label text-end">
      Ingame Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputIngameName"
        class="form-control"
        onInput={(e) => setFields("ingame_name", e.target.value)}
        value={data()?.ingame_name}
      />
    </div>
  </div>
);

export const Update = () => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const query = new URLSearchParams({
    page: searchParams.page || "",
  }).toString();
  const navigate = useNavigate();

  const [data] = createResource(() => memberGet(params.id, auth.user()?.token));
  const [fields, setFields] = createStore<Partial<Member>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(memberUpdate(params.id, fields as Member, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Done</b>,
      })
      .then(() => navigate(`/activity?${query}`))
      .catch(console.error);
  };

  return (
    <Show when={data()}>
      <div>
        <form id="form" onSubmit={submit}>
          {inputDiscordName(data, setFields)}
          {inputIngameName(data, setFields)}

          <div class="col-sm-6 text-center">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </Show>
  );
};
