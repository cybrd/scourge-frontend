import { Button, Modal } from "solid-bootstrap";
import { Index, createResource, createSignal, useContext } from "solid-js";
import toast, { Toaster } from "solid-toast";
import { A } from "@solidjs/router";

import { TEN, ZERO } from "../../constants";
import { activityDelete, activityList } from "../../services/activity";
import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";

export const List = () => {
  const [show, setShow] = createSignal(false);
  const [modalMessage, setModalMessage] = createSignal("");
  const [modalId, setModalId] = createSignal("");
  const handleOpen = (message: string, id: string) => {
    setModalMessage(message);
    setModalId(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const auth = useContext(AuthContext);
  const [options] = createSignal<Query>({
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), activityList);

  const handleDelete = (id: string) => {
    toast
      .promise(activityDelete(id, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Deleted</b>,
      })
      .then(() => location.reload())
      .catch(console.error);
  };

  return (
    <>
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Points</th>
            <th>Member Count</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          <Index each={data()?.data}>
            {(item) => (
              <tr>
                <td>{item().name}</td>
                <td>{item().activity_date.substring(ZERO, TEN)}</td>
                <td>{item().points}</td>
                <td>
                  <A href={`/activity/${item().id}/members`}>
                    {item().member_count}
                  </A>
                </td>
                <td>
                  {auth.user().username && (
                    <>
                      <div>
                        <a
                          href="#"
                          onClick={() =>
                            handleOpen(
                              `${item().activity_date} ${item().name}`,
                              item().id
                            )
                          }
                        >
                          Delete
                        </a>
                      </div>
                      <div>
                        <A href={`/activity/${item().id}?${options().query}`}>
                          Update
                        </A>
                      </div>
                    </>
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
          <Button variant="primary" onClick={() => handleDelete(modalId())}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </>
  );
};
