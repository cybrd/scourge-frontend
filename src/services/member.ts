import { StatusCodes } from "http-status-codes";

import { Member } from "../models/member";
import { Query } from "../models/query";

export const memberList = (options: Query) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/member?${options.query}`, {
    headers: {
      Authorization: `Bearer ${options.token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<Member[]> => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const memberCounts = (options: Query) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/member/counts`, {
    headers: {
      Authorization: `Bearer ${options.token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<number> => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const memberGet = (id: string, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/member/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res): Promise<Member> => {
    if (res.status !== StatusCodes.OK) {
      throw res;
    }

    return res.json();
  });

export const memberCreate = (data: Member, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/member`, {
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

export const memberUpdate = (id: string, data: Member, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/member/${id}`, {
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

export const memberDelete = (id: string, token = "") =>
  fetch(`${import.meta.env.VITE_API_SERVER}/member/${id}`, {
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
