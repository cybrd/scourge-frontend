import { A, useSearchParams } from "@solidjs/router";
import { JSX } from "solid-js";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, ONE, ZERO } from "../../constants";

import { SetParamsAndOptions } from "./params";

const prev = (setter: SetParamsAndOptions) => {
  const [params] = useSearchParams();
  const currentPage = Number(params.page) || DEFAULT_PAGE;

  let element: JSX.Element = (
    <li class="page-item">
      <a
        class="page-link"
        href="#"
        onClick={() => setter({ page: String(currentPage - ONE) })}
      >
        Previous
      </a>
    </li>
  );

  if (currentPage <= DEFAULT_PAGE) {
    element = (
      <li class="page-item disabled">
        <A class="page-link" href="#">
          Previous
        </A>
      </li>
    );
  }

  return element;
};

const next = (setter: SetParamsAndOptions, records: number) => {
  const [params] = useSearchParams();
  const currentPage = Number(params.page) || DEFAULT_PAGE;
  const totalPages = Math.ceil(records / DEFAULT_PAGE_SIZE);

  let element: JSX.Element = (
    <li class="page-item">
      <a
        class="page-link"
        href="#"
        onClick={() => setter({ page: String(currentPage + ONE) })}
      >
        Next
      </a>
    </li>
  );

  if (currentPage >= totalPages) {
    element = (
      <li class="page-item disabled">
        <A class="page-link" href="#">
          Next
        </A>
      </li>
    );
  }

  return element;
};

const select = (setter: SetParamsAndOptions, records: number) => {
  const [params] = useSearchParams();
  const currentPage = Number(params.page) || DEFAULT_PAGE;
  const totalPages = Math.ceil(records / DEFAULT_PAGE_SIZE);

  return (
    <li class="page-item">
      <select
        class="form-control"
        onChange={(e) => setter({ page: e.currentTarget.value })}
      >
        {[...Array(totalPages).keys()].map((i) => {
          const page = i + ONE;

          if (currentPage === page) {
            return <option selected>{page}</option>;
          }

          return <option>{page}</option>;
        })}
      </select>
    </li>
  );
};

export const pagination = (setter: SetParamsAndOptions, records = ZERO) => (
  <ul class="pagination justify-content-center">
    {prev(setter)}
    {select(setter, records)}
    {next(setter, records)}
  </ul>
);
