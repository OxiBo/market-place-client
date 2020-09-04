import React, { Component } from "react";
import { Query } from "react-apollo";
import PaginationStyles from "../styled/PaginationStyles";

export default class InnerPagination extends Component {
  state = {
    page: 1,
  };
  getPage = (n) => {
    this.setState((prevState) => ({ page: prevState.page + n }));
  };
  render() {
    const { page } = this.state;
    const {
      query,
      variableName,
      variableValue,
      perPage,
      connectionType,
    } = this.props;
    console.log(variableName);
    console.log(variableValue);
    return (
      <Query query={query} variables={{ [variableName]: variableValue }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;

          /* if (error) return <Error error={error} />; */
          console.log(data);
          console.log(variableValue);

          const count = data[connectionType].aggregate.count;
          console.log(count);
          const pages = Math.ceil(count / perPage);
          {
            /* 
          const page = this.props.page; */
          }
          return (
            <>
              <PaginationStyles>
                <a
                  onClick={(e) => {
                    this.getPage(-1);
                  }}
                  aria-disabled={page <= 1}
                >
                  ← Prev
                </a>
                <p>
                  Page {page} of {pages}
                </p>
                <p>{count} Total</p>
                <a
                  onClick={(e) => {
                    this.getPage(1);
                  }}
                  aria-disabled={page >= pages}
                >
                  Next →
                </a>
              </PaginationStyles>
              {this.props.children(this.state)}
            </>
          );
        }}
      </Query>
    );
  }
}
