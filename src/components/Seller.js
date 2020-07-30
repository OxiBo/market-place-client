import React, { Component } from "react";
import { Query } from "react-apollo";
import Helmet from "react-helmet";
// import { Formik } from "formik";
import styled from "styled-components";
import { withCookies } from "react-cookie";
import Error from "./ErrorMessage";
import InnerContainer from "./styled/InnerContainer";
// import Button from "./styled/Button";
// import Buttons from "./styled/Buttons";
// import Form from "./styled/Form";

import { SELLER_PUBLIC_PROFILE } from "../utils/serverOperations";

const Content = styled(InnerContainer)`
  background-color: #fdfcfc;
  display: flex;
  div {
    margin: 0.5rem;
    padding: 1rem;
    p {
      padding: 0.5rem;
    }
  }
`;

class Seller extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    return (
      <div>
        <Query query={SELLER_PUBLIC_PROFILE}
        variables={{ id: this.props.match.params.id}}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading....</p>;
            if (error) return <p>Error: {error.message}</p>;
            if (error) return <Error error={error} />;
            {/* console.log(data); */}
            const { name, email, id } = data.seller;
            return (
              <>
                <InnerContainer>
                  <Helmet>
                    <title>Seller Profile</title>
                  </Helmet>
                  <Content>
                    <div>
                      <p>Seller: </p><h3>{name}</h3>
                    </div>
                    <div>
                     {email && <p>Email: {email}</p>} 
                    </div>
                  </Content>
                </InnerContainer>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withCookies(Seller);
