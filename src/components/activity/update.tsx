import { Resource, Show, createResource, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";

import { activityGet, activityUpdate } from "../../services/activity";
import { Activity } from "../../models/activity";
import { AuthContext } from "../../context/auth";

const inputName = (
  data: Resource<Activity>,
  setFields: SetStoreFunction<Partial<Activity>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputName" class="col-sm-2 form-label text-end">
      Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputName"
        class="form-control"
        onInput={(e) => setFields("name", e.target.value)}
        value={data()?.name}
      />
    </div>
  </div>
);

const inputPoints = (
  data: Resource<Activity>,
  setFields: SetStoreFunction<Partial<Activity>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputPoints" class="col-sm-2 form-label text-end">
      Points
    </label>
    <div class="col-sm-4">
      <input
        id="inputPoints"
        class="form-control"
        onInput={(e) => setFields("points", Number(e.target.value))}
        value={data()?.points}
      />
    </div>
  </div>
);

const inputDate = (
  data: Resource<Activity>,
  setFields: SetStoreFunction<Partial<Activity>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputActivityDate" class="col-sm-2 form-label text-end">
      Date
    </label>
    <div class="col-sm-4">
      <input
        id="inputActivityDate"
        type="date"
        class="form-control"
        onInput={(e) => setFields("activity_date", e.target.value)}
        value="2024-12-25"
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

  const [data] = createResource(() =>
    activityGet(params.id, auth.user()?.token)
  );
  const [fields, setFields] = createStore<Partial<Activity>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(
        activityUpdate(params.id, fields as Activity, auth.user()?.token),
        {
          error: "An error occurred 😔",
          loading: "Loading",
          success: <b>Done</b>,
        }
      )
      .then(() => navigate(`/activity?${query}`))
      .catch(console.error);
  };

  return (
    <Show when={data()}>
      <div>
        <form id="form" onSubmit={submit}>
          {inputName(data, setFields)}
          {inputDate(data, setFields)}
          {inputPoints(data, setFields)}

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
