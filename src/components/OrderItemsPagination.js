import React, { Component } from "react";
import { Query } from "react-apollo";
// import { Link } from "react-router-dom";

import PaginationStyles from "./styled/PaginationStyles";
import { ALL_USER_ORDERITEMS_PAGINATION } from "../utils/serverOperations";
import { orderItemsPerPage } from "../configVars";
import Error from "./ErrorMessage"; // ???

class OrderItemsPagination extends Component {
  //   state = {
  //     page: 1,
  //   };
  render() {
    return (
      <Query
        query={ALL_USER_ORDERITEMS_PAGINATION}
        variables={{ userId: this.props.userId }}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          /* if (error) return <Error error={error} />; */

          const count =  data.orderItemsConnection.aggregate.count;
          const pages = Math.ceil(count / orderItemsPerPage);
        
          const page = this.props.page;
          return (
            <PaginationStyles>
              <a
                onClick={(e) => {
                  {/* e.preventDefault();
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation(); */}
                  this.props.getPage(-1);
            
                }}
                aria-disabled={page <= 1}
              >
                ← Prev
              </a>
              <p>
                Page {page} of {pages}
              </p>
              <p>{count} Ordered Items Total</p>
              <a
                onClick={(e) => {
                  {/* e.preventDefault(); */}
                  {/* e.stopPropagation(); */}
                  {/* e.nativeEvent.stopImmediatePropagation(); */}
                  this.props.getPage(1);
                }}
                aria-disabled={page >= pages}
              >
                Next →
              </a>
            </PaginationStyles>
          );
        }}
      </Query>
    );
  }
}
export default OrderItemsPagination;

/* <a
                onClick={async () => {
                  await this.setState((prevState) => ({
                    page: prevState.page - 1,
                  }));
                  this.props.getPage(this.state.page);
                }}
                aria-disabled={page <= 1}
              >
                ← Prev
              </a>
              <p>
                Page {page} of {pages}
              </p>
              <p>{count} Reviews Total</p>
              <a
                onClick={async () => {
                  await this.setState((prevState) => ({
                    page: prevState.page + 1,
                  }));
                  this.props.getPage(this.state.page);
                }}
                aria-disabled={page >= pages}
              >
                Next →
              </a>*/
