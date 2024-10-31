import { StatusCodes } from "http-status-codes";

import { MemberWithPoints } from "../models/member";
import { Query } from "../models/query";

export const summary = (options: Query) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/summary`, {
    headers: {
      Authorization: `Bearer ${options.token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<MemberWithPoints[]> => {
    if (res.status !== StatusCodes.OK) {
      throw StatusCodes[res.status];
    }

    return res.json();
  });
