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
  memberActivityCreate,
  memberActivityDelete,
  memberActivityList,
} from "../../services/member-activity";
import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { activityGet } from "../../services/activity";

export const Members = () => {
  const [modalMessage, setModalMessage] = createSignal("");
  const [memberId, setMemberId] = createSignal("");
  const [memberIds, setMemberIds] = createSignal<string[]>([]);

  const [activity] = createResource(() =>
    activityGet(params.id, auth.user()?.token)
  );

  const [show, setShow] = createSignal(false);
  const handleOpen = (message: string, memberIdParam: string) => {
    setModalMessage(message);
    setMemberId(memberIdParam);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const [showCreate, setShowCreate] = createSignal(false);
  const handleCreateOpen = (message: string) => {
    setModalMessage(message);
    setShowCreate(true);
  };
  const handleCreateClose = () => setShowCreate(false);

  const auth = useContext(AuthContext);
  const params = useParams();
  const [options] = createSignal<Query>({
    id: params.id,
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), memberActivityList);

  const handleDelete = () => {
    toast
      .promise(
        memberActivityDelete(params.id || "", memberId(), auth.user()?.token),
        {
          error: "An error occurred 😔",
          loading: "Loading",
          success: <b>Deleted</b>,
        }
      )
      .then(() => location.reload())
      .catch(console.error);
  };

  const handleCreate = () => {
    toast
      .promise(
        memberActivityCreate(params.id || "", memberIds(), auth.user()?.token),
        {
          error: "An error occurred 😔",
          loading: "Loading",
          success: <b>Members Added</b>,
        }
      )
      .then(() => location.reload())
      .catch(console.error);
  };

  return (
    <>
      <Show when={activity()}>
        <table>
          <tbody>
            <tr>
              <td>Activity</td>
              <td>{activity()?.name}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{activity()?.type}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{activity()?.activity_date}</td>
            </tr>
          </tbody>
        </table>
      </Show>
      {auth.user().username && (
        <div class="p-2">
          <Button
            variant="primary"
            onClick={() => handleCreateOpen("Add Members to this activity")}
          >
            Add Members
          </Button>
        </div>
      )}
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr>
            <th>Discord Name</th>
            <th>Ingame Name</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          <Index each={data()}>
            {(item) => (
              <tr>
                <td>{item().discord_name}</td>
                <td>
                  <A href={`/member/${item().id}/activity`}>
                    {item().ingame_name}
                  </A>
                </td>
                <td>
                  {auth.user().username && (
                    <div>
                      <a
                        href="#"
                        onClick={() =>
                          handleOpen(
                            `${item().activity_date} ${item().name}`,
                            item().member_id
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

      <Modal show={showCreate()} onHide={handleCreateClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group row p-1 align-items-center">
            <label for="inputMembers" class="col-sm-2 form-label text-end">
              Member Discord Name
            </label>
            <div class="col-sm-4">
              <textarea
                id="inputMembers"
                class="form-control"
                onInput={(e) => setMemberIds(e.target.value.split("\n"))}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleCreate()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Toaster />
    </>
  );
};
