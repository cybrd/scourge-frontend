import { type Component, createSignal, useContext } from "solid-js";
import { AuthContext } from "../context/auth";
import { StatusCodes } from "http-status-codes";

export const Home: Component = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = createSignal("");

  fetch(`${import.meta.env.VITE_API_SERVER}/test/admin`, {
    headers: {
      Authorization: `Bearer ${auth.user()?.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== StatusCodes.OK) {
        throw res;
      }

      return res.json();
    })
    .then((res: string) => {
      setData(res);
    })
    .catch(console.error);

  return (
    <div>
      <div>Home</div>
      <div>{data()}</div>
    </div>
  );
};
