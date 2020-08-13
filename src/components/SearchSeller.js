import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";
import Downshift, { resetIdCounter } from "downshift";
import debounce from "lodash.debounce";
import { SearchStyles, Dropdown, DropdownItem } from "./styled/SearchStyles";
import { SEARCH_SELLER } from "../utils/serverOperations";

class SearchSeller extends Component {
  state = { foundSellers: [], loading: false };
  onChange = debounce(async (e, client) => {
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_SELLER,
      variables: { query: e.target.value },
    });
    // console.log(res);
    this.setState({ foundSellers: res.data.sellers, loading: false });
  }, 350);

  routeToSellerPage = (seller) => {
    this.props.history.push(`/seller/${seller.id}`);
  };

  render() {
    resetIdCounter(); // https://github.com/downshift-js/downshift#utilities
    return (
      <SearchStyles>
        <Downshift
          onChange={this.routeToSellerPage}
          itemToString={(seller) => (seller ? seller.name : "")}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
          }) => (
            <div>
              <ApolloConsumer>
                {(client) => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search A Seller",
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
                  {this.state.foundSellers.map((seller, index) => (
                    <DropdownItem
                      {...getItemProps({
                        key: seller.id,
                        item: seller,
                        highlighted: highlightedIndex === index ? true : false,
                      })}
                    >
                      {seller.logoImage && (
                        <img src={seller.image} alt={seller.name} />
                      )}
                      <p>{seller.name}</p>
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default withRouter(SearchSeller);
