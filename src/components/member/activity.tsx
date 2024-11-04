import { A, useParams } from "@solidjs/router";
import { Button, Modal } from "solid-bootstrap";
import {
  Index,
  Show,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import toast, { Toaster } from "solid-toast";

import {
  memberActivityDelete,
  memberActivityListByMember,
} from "../../services/member-activity";
import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { memberGet } from "../../services/member";

export const Activity = () => {
  const auth = useContext(AuthContext);
  const params = useParams();

  const [modalMessage, setModalMessage] = createSignal("");
  const [activityId, setActivityId] = createSignal("");

  const [member] = createResource(() =>
    memberGet(params.id, auth.user()?.token)
  );

  const [options] = createSignal<Query>({
    id: params.id,
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), memberActivityListByMember);

  const [show, setShow] = createSignal(false);
  const handleOpen = (message: string, activityIdParam: string) => {
    setModalMessage(message);
    setActivityId(activityIdParam);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const handleDelete = () => {
    toast
      .promise(
        memberActivityDelete(activityId(), params.id || "", auth.user()?.token),
        {
          error: "An error occurred 😔",
          loading: "Loading",
          success: <b>Deleted</b>,
        }
      )
      .then(() => location.reload())
      .catch(console.error);
  };

  return (
    <>
      <Show when={member()}>
        <table class="table table-striped table-hover table-bordered">
          <tbody>
            <tr>
              <td>Discord Name</td>
              <td>{member()?.discord_name}</td>
            </tr>
            <tr>
              <td>Ingame Name</td>
              <td>{member()?.ingame_name}</td>
            </tr>
          </tbody>
        </table>
      </Show>
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr>
            <th>Activity</th>
            <th>Type</th>
            <th>Date</th>
            <th>Points</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          <Index each={data()}>
            {(item) => (
              <tr>
                <td>{item().name}</td>
                <td>{item().type}</td>
                <td>
                  <A href={`/activity/${item().id}/members`}>
                    {item().activity_date}
                  </A>
                </td>
                <td>{item().points}</td>
                <td>
                  {auth.user()?.username && (
                    <div>
                      <a
                        href="#"
                        onClick={() =>
                          handleOpen(
                            `${item().activity_date} ${item().name}`,
                            item().activity_id
                          )
                        }
                      >
                        Delete
                      </a>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </Index>
        </tbody>
      </table>

      <Modal show={show()} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Toaster />
    </>
  );
};
