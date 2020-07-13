import React, { Component } from "react";
import { Query } from "react-apollo";
// import { Link } from "react-router-dom";

import PaginationStyles from "./styled/PaginationStyles";
import { ALL_REVIEWS_PAGINATION } from "../utils/operations";
import { reviewsPerPage } from "../configVars";
import Error from "./ErrorMessage"; // ???

class ReviewsPagination extends Component {
  //   state = {
  //     page: 1,
  //   };
  render() {
    return (
      <Query
        query={ALL_REVIEWS_PAGINATION}
        variables={{ productId: this.props.productId }}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          /* if (error) return <Error error={error} />; */

          const count =  data.reviewsConnection.aggregate.count;
          const pages = Math.ceil(count / reviewsPerPage);
        
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
              <p>{count} Reviews Total</p>
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
export default ReviewsPagination;

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
