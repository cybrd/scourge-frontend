import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useContext } from "solid-js";

import { AuthContext } from "../../context/auth";
import { Member } from "../../models/member";
import { memberCreate } from "../../services/member";

const inputDiscordName = (setFields: SetStoreFunction<Partial<Member>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputDiscordName" class="col-sm-2 form-label text-end">
      Discord Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputDiscordName"
        class="form-control"
        onInput={(e) => setFields("discord_name", e.target.value)}
      />
    </div>
  </div>
);

const inputIngameName = (setFields: SetStoreFunction<Partial<Member>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputIngameName" class="col-sm-2 form-label text-end">
      Ingame Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputIngameName"
        class="form-control"
        onInput={(e) => setFields("ingame_name", e.target.value)}
      />
    </div>
  </div>
);

export const Create = () => {
  const auth = useContext(AuthContext);

  let [fields, setFields] = createStore<Partial<Member>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(memberCreate(fields as Member, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Done</b>,
      })
      .then(() => {
        const form = document.getElementById("form") as HTMLFormElement;
        form.reset();
        [fields, setFields] = createStore<Partial<Member>>({});
      })
      .catch(console.error);
  };

  return (
    <div>
      <form id="form" onSubmit={submit}>
        {inputDiscordName(setFields)}
        {inputIngameName(setFields)}

        <div class="col-sm-6 text-center">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};
