import { Button, Modal } from "solid-bootstrap";
import { Index, createResource, createSignal, useContext } from "solid-js";
import toast, { Toaster } from "solid-toast";
import { useParams, useSearchParams } from "@solidjs/router";

import {
  memberActivityDelete,
  memberActivityList,
} from "../../services/member-activity";
import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { setParamsAndOptions } from "../helper/params";

export const Members = () => {
  const [show, setShow] = createSignal(false);
  const [modalMessage, setModalMessage] = createSignal("");
  const [memberId, setMemberId] = createSignal("");
  const handleOpen = (message: string, memberIdParam: string) => {
    setModalMessage(message);
    setMemberId(memberIdParam);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const auth = useContext(AuthContext);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = createSignal<Query>({
    id: params.id,
    query: "",
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), memberActivityList);

  const handleDelete = (memberIdParam: string) => {
    toast
      .promise(
        memberActivityDelete(
          searchParams.id || "",
          memberIdParam,
          auth.user()?.token
        ),
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

  return (
    <>
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr>
            <th>Ingame Name</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          <Index each={data()}>
            {(item) => (
              <tr>
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
          <Button variant="primary" onClick={() => handleDelete(memberId())}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </>
  );
};
