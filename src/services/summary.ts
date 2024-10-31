import { StatusCodes } from "http-status-codes";

import { MemberWithPoints } from "../models/member";

export const summary = () =>
  fetch(`${import.meta.env.VITE_API_SERVER}/summary`, {
    headers: { "Content-Type": "application/json" },
  }).then((res): Promise<MemberWithPoints[]> => {
    if (res.status !== StatusCodes.OK) {
      throw StatusCodes[res.status];
    }

    return res.json();
  });
