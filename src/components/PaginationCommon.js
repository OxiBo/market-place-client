// TODO - update title of the document respectively

import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import PaginationStyles from "./styled/PaginationStyles";
// import { ALL_PRODUCTS_PAGINATION } from "../utils/serverOperations";
// import { perPage } from "../configVars";
import Error from "./ErrorMessage";
const perPage = 2; // for testing
const PaginationCommon = ({
  connection,
  item,
  page,
  query,
  queryVariables,
  pathname,
}) => {
  console.log(queryVariables)
  return (
    <Query query={query} variables={queryVariables || {}}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;

        {
          /* console.log(data[connection].aggregate.count); */
        }

        const count = data[connection].aggregate.count;
        const pages = Math.ceil(count / perPage);

        return (
          <PaginationStyles>
            <Helmet>
              <title>{`All ${item}! - Page ${page} of ${pages}`}</title>
            </Helmet>
            {/* https://reactrouter.com/web/api/Link */}
            <Link
              to={{ pathname, search: `?page=${page - 1}` }}
              aria-disabled={page <= 1}
            >
              ← Prev
            </Link>
            <p>
              Page {page} of {pages}
            </p>
            <p>
              {count} {`${item} Total`}
            </p>
            <Link
              to={{ pathname, search: `?page=${page + 1}` }}
              aria-disabled={page >= pages}
            >
              Next →
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};
export default PaginationCommon;
