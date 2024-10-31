import { StatusCodes } from "http-status-codes";

import { MemberActivityFull } from "../models/member-activity";
import { Query } from "../models/query";

export const memberActivityList = (options: Query) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/activity/${options.id}/member`, {
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
    }/activity/${activityId}/member/${memberId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }
  ).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });
