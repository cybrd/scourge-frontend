import { StatusCodes } from "http-status-codes";

import { MemberActivityFull } from "../models/member-activity";
import { Query } from "../models/query";

export const memberActivityList = (options: Query) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/member-activity/${options.id}`, {
    headers: {
      Authorization: `Bearer ${options.token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<MemberActivityFull[]> => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const memberActivityDelete = (
  activityId: string,
  memberId: string,
  token = ""
) =>
  fetch(
    `${
      import.meta.env.VITE_API_SERVER
    }/member-activity/${activityId}/${memberId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    }
  ).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const memberActivityCreate = (
  activityId: string,
  memberIds: string[],
  token = ""
) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/member-activity/${activityId}`, {
    body: JSON.stringify(memberIds),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });
