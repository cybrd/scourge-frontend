import { NavigateOptions, SetParams } from "@solidjs/router";
import { Setter, useContext } from "solid-js";

import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";

export const setParamsAndOptions =
  (
    setOptions: Setter<Query>,
    setParams: (params: SetParams, options?: Partial<NavigateOptions>) => void,
    currentOptions: Partial<Query> = {}
  ) =>
  (newSearchParams: Record<string, string>) => {
    const auth = useContext(AuthContext);

    const currentSearchParams = Object.fromEntries(
      new URLSearchParams(document.location.search)
    );

    const updatedSearchParams = {
      ...currentSearchParams,
      ...newSearchParams,
    };

    setParams(updatedSearchParams);
    const query = new URLSearchParams(updatedSearchParams).toString();
    const newOptions = {
      query,
      token: auth.user()?.token || "",
    };
    setOptions({ ...currentOptions, ...newOptions });
  };

export type SetParamsAndOptions = ReturnType<typeof setParamsAndOptions>;
