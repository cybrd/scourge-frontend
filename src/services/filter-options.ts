import { StatusCodes } from "http-status-codes";

import { FilterOptions } from "../models/filter-options";

export const filterOptionsList = (token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/filterOptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<FilterOptions> => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });
