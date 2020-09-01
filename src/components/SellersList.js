import React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import BigHeader from "./styled/BigHeader";

import {
  FETCH_SELLERS,
  ALL_SELLERS_PAGINATION,
} from "../utils/serverOperations";
import SellerShort from "./SellerShort";
import Error from "./ErrorMessage";
import PaginationCommon from "./PaginationCommon";
import SearchSeller from "./SearchSeller";
import InnerContainer from "./styled/InnerContainer";
// import { perPage } from "../configVars";

const perPage = 2; // for testing

const Header = styled.div`
  /* padding: 2rem; */
  border-bottom: 2px solid lightgrey;
`;

const SellersList = (props) => {
  const page = props.location.search.split("=")[1];
  return (
    <InnerContainer>
      <Header>
        <BigHeader>All Sellers</BigHeader>
        <SearchSeller />
      </Header>
      <PaginationCommon
        query={ALL_SELLERS_PAGINATION}
        item={"sellers"}
        page={parseFloat(page) || 1}
        connection={"sellersConnection"}
        pathname={'/sellers'}
      />
      <Query
        query={FETCH_SELLERS}
        variables={{ skip: page * perPage - perPage, first: perPage }}
      >
        {({ data, error, loading }) => {
          {
            /* console.log(data); */
          }
          if (loading) return <p>Loading....</p>;
          if (error) return <Error error={error} />;
          return data.sellers.map((seller) => (
            <SellerShort key={seller.id} seller={seller} />
          ));
        }}
      </Query>
    </InnerContainer>
  );
};

export default SellersList;
