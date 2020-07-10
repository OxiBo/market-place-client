// TODO - update title of the document respectively

import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Helmet from 'react-helmet'
import PaginationStyles from "./styled/PaginationStyles";
import { PAGINATION } from "../utils/operations";
import { perPage } from "../configVars";
import Error from "./ErrorMessage";
const Pagination = (props) => {
  return (
    <Query query={PAGINATION}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;

        if (error) return <Error error={error} />;
        {
          /* console.log(data); */
        }
        const count = data.productsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page;
        return (
          <PaginationStyles>
            <Helmet>
              <title>
                {`All Products! - Page ${page} of ${pages}`}
              </title>
            </Helmet>
            {/* https://reactrouter.com/web/api/Link */}
            <Link
              to={{ pathname: "/", search: `?page=${page - 1}` }}
              aria-disabled={page <= 1}
            >
              ← Prev
            </Link>
            <p>
              Page {page} of {pages}
            </p>
            <p>{count} Products Total</p>
            <Link
              to={{ pathname: "/", search: `?page=${page + 1}` }}
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
export default Pagination;
