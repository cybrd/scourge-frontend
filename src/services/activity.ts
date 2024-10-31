import { StatusCodes } from "http-status-codes";

import { Activity } from "../models/activity";
import { Query } from "../models/query";

export type ActivityList = {
  counts: number;
  data: Activity[];
};
export const activityList = (options: Query) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/activity?${options.query}`, {
    headers: {
      Authorization: `Bearer ${options.token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<ActivityList> => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const activityGet = (id: string, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<Activity> => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const activityCreate = (data: Activity, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/activity`, {
    body: JSON.stringify(data),
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

export const activityUpdate = (id: string, data: Activity, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/activity/${id}`, {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
  }).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const activityDelete = (id: string, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  }).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });
