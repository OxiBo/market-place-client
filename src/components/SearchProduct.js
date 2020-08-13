import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";
import Downshift, { resetIdCounter } from "downshift";
import debounce from "lodash.debounce";
import { SearchStyles, Dropdown, DropdownItem } from "./styled/SearchStyles";
import { SEARCH_PRODUCT } from "../utils/serverOperations";

class SearchProduct extends Component {
  state = { loading: false, foundProducts: [] };

  onChange = debounce(async (e, client) => {
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_PRODUCT,
      variables: { query: e.target.value },
    });
    this.setState({ foundProducts: res.data.products, loading: false });
    // console.log(res);
  }, 400);

  routeToProductPage = (product) => {
    this.props.history.push(`/item/${product.id}`);
  };
  render() {
    resetIdCounter(); // https://github.com/downshift-js/downshift#utilities
    return (
      <SearchStyles>
        <Downshift
          onChange={this.routeToProductPage}
          itemToString={(product) => (product === null ? "" : product.name)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
          }) => (
            <div>
              <ApolloConsumer>
                {(client) => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search For A Product",
                      onChange: (e) => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <Dropdown>
                  {this.state.foundProducts.map((product, index) => (
                    <DropdownItem
                      {...getItemProps({ item: product })}
                      key={product.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img src={product.image} alt={product.name} />
                      <p>{product.name}</p>
                    </DropdownItem>
                  ))}
                  {!this.state.foundProducts.length && !this.state.loading && (
                    <DropdownItem>Nothing found for {inputValue} </DropdownItem>
                  )}
                </Dropdown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default withRouter(SearchProduct);
