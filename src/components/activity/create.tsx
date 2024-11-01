import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useContext } from "solid-js";

import { Activity, activityTypeList } from "../../models/activity";
import { AuthContext } from "../../context/auth";
import { activityCreate } from "../../services/activity";
import { useNavigate } from "@solidjs/router";

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

const selectType = (setFields: SetStoreFunction<Partial<Activity>>) => (
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
        {activityTypeList.map((x) => (
          <option>{x}</option>
        ))}
      </select>
    </div>
  </div>
);

const inputPoints = (setFields: SetStoreFunction<Partial<Activity>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputPoints" class="col-sm-2 form-label text-end">
      Points
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

const inputDate = (setFields: SetStoreFunction<Partial<Activity>>) => (
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
      />
    </div>
  </div>
);

export const Create = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [fields, setFields] = createStore<Partial<Activity>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(activityCreate(fields as Activity, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Done</b>,
      })
      .then(() => navigate("/activity"))
      .catch(console.error);
  };

  return (
    <div>
      <form id="form" onSubmit={submit}>
        {inputName(setFields)}
        {selectType(setFields)}
        {inputDate(setFields)}
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
