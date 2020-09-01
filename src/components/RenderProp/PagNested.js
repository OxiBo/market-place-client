import React from "react";
import InnerPagination from "./InnerPagination";
import { ALL_USER_ORDERITEMS_PAGINATION } from "../../utils/serverOperations";

import { Query } from "react-apollo";
// import { Link } from "react-router-dom";
import SmallContainer from "./../styled/SmallContainer";
import { FETCH_USER_ORDERITEMS } from "../../utils/serverOperations";
// import { orderItemsPerPage } from "../configVars";
// import PaginationStyles from "./styled/PaginationStyles";
// import { ALL_REVIEWS_PAGINATION } from "../../utils/serverOperations";
import { orderItemsPerPage } from "../../configVars";
import Error from "./../ErrorMessage"; // ???

const PagNested = () => (
  <SmallContainer>
    <InnerPagination
      query={ALL_USER_ORDERITEMS_PAGINATION}
      variableName={"userId"}
      variableValue={"ck9x9bp5i02t90765f5wwt8mf"}
      perPage={orderItemsPerPage}
      connectionType={"orderItemsConnection"}
    >
      {({ page }) =>
        console.log(page) || (
          <Query
            query={FETCH_USER_ORDERITEMS}
            variables={{
              skip: page * orderItemsPerPage - orderItemsPerPage,
              first: orderItemsPerPage,
            }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <Error error={error} />;
              console.log(data);

              return data.myOrderItems.map((item) => <div>{item.name}</div>);
            }}
          </Query>
        )
      }
    </InnerPagination>
  </SmallContainer>
);

export default PagNested;
