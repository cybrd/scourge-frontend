import { StatusCodes } from "http-status-codes";

export const userLogin = (username: string, password: string) =>
  fetch(`${import.meta.env.VITE_API_SERVER}/user/login`, {
    body: JSON.stringify({
      password,
      username,
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).then((res) => {
    if (res.status !== StatusCodes.OK) {
      throw StatusCodes[res.status];
    }

    return res.json();
  });
