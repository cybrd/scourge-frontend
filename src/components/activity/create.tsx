import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useContext } from "solid-js";

import { Activity } from "../../models/activity";
import { AuthContext } from "../../context/auth";
import { activityCreate } from "../../services/activity";

const inputName = (setFields: SetStoreFunction<Partial<Activity>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputName" class="col-sm-2 form-label text-end">
      Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputName"
        class="form-control"
        onInput={(e) => setFields("name", e.target.value)}
      />
    </div>
  </div>
);

const inputPoints = (setFields: SetStoreFunction<Partial<Activity>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputPoints" class="col-sm-2 form-label text-end">
      Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputPoints"
        class="form-control"
        onInput={(e) => setFields("points", Number(e.target.value))}
      />
    </div>
  </div>
);

export const Create = () => {
  const auth = useContext(AuthContext);

  let [fields, setFields] = createStore<Partial<Activity>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(activityCreate(fields as Activity, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Done</b>,
      })
      .then(() => {
        const form = document.getElementById("form") as HTMLFormElement;
        form.reset();
        [fields, setFields] = createStore<Partial<Activity>>({});
      })
      .catch(console.error);
  };

  return (
    <div>
      <form id="form" onSubmit={submit}>
        {inputName(setFields)}
        {inputPoints(setFields)}

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
