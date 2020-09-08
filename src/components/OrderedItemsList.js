import React from "react";
import { Query } from "react-apollo";
import {
  ALL_USER_ORDERITEMS_PAGINATION,
  FETCH_USER_ORDERITEMS,
} from "../utils/serverOperations";
import InnerPagination from "./RenderProp/InnerPagination";
import SingleOrderItem from "./SingleOrderItem";
import Error from "./ErrorMessage"; // ???
import SmallContainer from "./styled/SmallContainer";
import { orderItemsPerPage } from "../configVars";

const OrderedItemsList = ({ userId }) => (
  <SmallContainer data-test="ordered-items-list">
    <InnerPagination
      query={ALL_USER_ORDERITEMS_PAGINATION}
      variableName={"userId"}
      variableValue={userId}
      perPage={orderItemsPerPage}
      connectionType={"orderItemsConnection"}
    >
      {({ page }) =>
         (
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
              return data.myOrderItems.map(
                (item) =>
                 (
                    <SingleOrderItem item={item} key={item.id} />
                  )
              );
            }}
          </Query>
        )
      }
    </InnerPagination>
  </SmallContainer>
);

export default OrderedItemsList;
