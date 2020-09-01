import React from "react";
import { Query } from "react-apollo";
import {
  ALL_USER_ORDERITEMS_PAGINATION,
  FETCH_USER_ORDERITEMS,
} from "../utils/serverOperations";
import InnerPagination from "./RenderProp/InnerPagination";
import SingleOrderItem from "./SingleOrderItem"
import Error from "./ErrorMessage"; // ???
import SmallContainer from "./styled/SmallContainer";
import { orderItemsPerPage } from "../configVars";

const OrderedItemsList = () => (
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
             
              return data.myOrderItems.map((item) => <SingleOrderItem item={item} key={item.id}/>);
            }}
          </Query>
        )
      }
    </InnerPagination>
  </SmallContainer>
);

export default OrderedItemsList;
