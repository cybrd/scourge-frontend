import { Button, Modal } from "solid-bootstrap";
import { Index, createResource, createSignal, useContext } from "solid-js";
import toast, { Toaster } from "solid-toast";
import { useParams, useSearchParams } from "@solidjs/router";

import {
  memberActivityCreate,
  memberActivityDelete,
  memberActivityList,
} from "../../services/member-activity";
import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { setParamsAndOptions } from "../helper/params";

export const Members = () => {
  const [modalMessage, setModalMessage] = createSignal("");
  const [memberId, setMemberId] = createSignal("");
  const [memberIds, setMemberIds] = createSignal<string[]>([]);

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
  const handleCreateClose = () => setShow(false);

  const auth = useContext(AuthContext);
  const params = useParams();
  const [_, setSearchParams] = useSearchParams();
  const [options, setOptions] = createSignal<Query>({
    id: params.id,
    query: "",
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
      .then(() => {
        setParamsAndOptions(setOptions, setSearchParams)({});
        handleClose();
      })
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
      .then(() => {
        setParamsAndOptions(setOptions, setSearchParams)({});
        handleClose();
      })
      .catch(console.error);
  };

  return (
    <>
      {auth.user() && (
        <div>
          <a
            href="#"
            onClick={() => handleCreateOpen("Add Members to this activity")}
          >
            Add
          </a>
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
                <td>{item().ingame_name}</td>
                <td>
                  {auth.user() && (
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
              <input
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
