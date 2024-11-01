import { Resource, Show, createResource, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useNavigate, useParams } from "@solidjs/router";

import { Activity, activityTypeList } from "../../models/activity";
import { TEN, ZERO } from "../../constants";
import { activityGet, activityUpdate } from "../../services/activity";
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

const selectType = (
  data: Resource<Activity>,
  setFields: SetStoreFunction<Partial<Activity>>
) => (
  <div class="form-group row p-1">
    <label for="selectType" class="col-sm-2 form-label text-end">
      Type
    </label>
    <div class="col-sm-4">
      <select
        id="selectType"
        onChange={(e) => setFields("type", e.target.value)}
      >
        <option value="">----</option>
        {activityTypeList.map((x) => {
          if (data()?.type === x) {
            return <option selected>{x}</option>;
          }

          return <option>{x}</option>;
        })}
      </select>
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
        value={data()?.activity_date.substring(ZERO, TEN)}
      />
    </div>
  </div>
);

export const Update = () => {
  const auth = useContext(AuthContext);
  const params = useParams();
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
      .then(() => navigate(`/activity`))
      .catch(console.error);
  };

  return (
    <Show when={data()}>
      <div>
        <form id="form" onSubmit={submit}>
          {inputName(data, setFields)}
          {selectType(data, setFields)}
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
