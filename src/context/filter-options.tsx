import {
  Accessor,
  ParentProps,
  Setter,
  createContext,
  createSignal,
} from "solid-js";

import { FilterOptions } from "../models/filter-options";

const providerValue = () => {
  const [filterOptions, setFilterOptions] = createSignal<FilterOptions>({
    department: {},
    fingerPrintId: {},
    handbook: {},
  });

  return { filterOptions, setFilterOptions };
};

export const FilterOptionsContext = createContext<{
  filterOptions: Accessor<FilterOptions>;
  setFilterOptions: Setter<FilterOptions>;
}>(providerValue());

export const AuthProvider = (props: ParentProps) => (
  <FilterOptionsContext.Provider value={providerValue()}>
    {props.children}
  </FilterOptionsContext.Provider>
);
