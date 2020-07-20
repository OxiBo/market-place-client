import React, { Component } from "react";
import { Query } from "react-apollo";
import { withCookies } from "react-cookie";
import styled from "styled-components";
import Error from "./ErrorMessage";
import DeleteButton from "./DeleteButton";
import ProductReviews from "./ProductReviews";
import { FETCH_SINGLE_PRODUCT } from "../utils/operations";
import { PriceTag } from "./Item";
// import ProductReview from "./ProductReview";
import Buttons from "./styled/Buttons";
import Button from "./styled/Button";
import { ItemButton } from "./Item";

const SingleItemStyles = styled.div`
  background-color: ${(props) => props.theme.innerContainerBackground};
  border-radius: 5px;
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
`;

const Visual = styled.div`
  flex: 45%;
  padding: 0 1rem 0 0;
  border-right: 2px solid lightgray;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
`;

const VisualDivs = styled.div`
  display: flex;
  justify-content: center;
  p {
    min-width: 6rem;
    text-align: center;
    padding: 1rem;
    display: block;
    line-height: 2;
    font-style: italic;
  }
  h2,
  h3 {
    padding: 1rem;
    flex: 1;
    text-align: center;
    line-height: 2;
    /* margin: 1rem auto; */
    a{
      text-decoration: none;
    }
  }
  a {
    cursor: pointer;
    text-align: center;
    padding: 1rem;
    /* line-height: 2; */
    color: ${(props) => props.theme.purple};
  }
`;

const ProductInfo = styled.div`
  flex: 55%;
  padding: 0 0 0 1rem;
  display: flex;
  flex-direction: column;
  /* position: relative; */
  h3 {
    padding: 0 2rem 2rem 2rem;
    text-align: center;
    font-size: 4rem;
    /* border-bottom: 2px solid grey; */
  }
  hr {
    border: 0;
    height: 3px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      ${(props) => props.theme.purple},
      rgba(0, 0, 0, 0)
    );
  }
  .stock {
    text-align: center;
    font-style: italic;
    font-size: 2rem;
    font-weight: 700;
    padding: 1rem;
    color: ${(props) => props.theme.purple};
  }
  .description {
    flex: 1;
    padding: inherit;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Price = styled.span`
  min-width: 50%;
  max-width: 70%;
  display: block;
  text-align: center;
  /* position: relative; */
  margin: auto auto 0 auto;
  border-radius: 5px;
  padding: 2rem;
  line-height: 1;
  font-size: 3rem;
  background: purple;
  transform: rotate(-3deg);
  color: white !important;
  font-weight: 600;
`;

class SingleItem extends Component {
  state = {
    reviews: false,
  };



  showReviews = () => {
    this.setState((prevState) => ({
      reviews: !prevState.reviews,
    }));
  };

  render() {
    // console.log(this.props);
    const { allCookies } = this.props;
    const userId = allCookies.id;
    const type = allCookies.type;
    // console.log(type);
    return (
      <Query
        query={FETCH_SINGLE_PRODUCT}
        variables={{ id: this.props.match.params.id }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          {
            /* console.log(data); */
          }
          if (!data.product) return <p>No item found for id:{this.props.id}</p>;
          {
            /* console.log(data.product); */
          }
          const {
            id,
            description,
            name,
            largeImage,
            price,
            rating,
            seller,
            stock,
            reviews,
          } = data.product;
          return (
            <>
              <SingleItemStyles>
                <Visual>
                  <img
                    src={
                      largeImage ||
                      "https://res.cloudinary.com/di0hg10hd/image/upload/c_scale,q_auto,w_1000/v1594237808/sickfits/n0t4uceatjy5jdoee9p0.png"
                    }
                    alt={name}
                  />
                  <VisualDivs>
                    {rating ? (
                      <>
                        <p>Rating: </p>
                        <h3>{rating}</h3>
                        <a onClick={this.showReviews}>
                          
                          {this.state.reviews ? "Hide Reviews" : "See Reviews"}
                        </a>
                      </>
                    ) : (
                      <p>Nobody rated the product yet</p>
                    )}
                  </VisualDivs>
                  <VisualDivs>
                    <p>Sold By: </p>
                    <h2><a href={`/seller/${seller.id}`}><span>{seller.name}</span></a></h2>
                  </VisualDivs>
                </Visual>
                <ProductInfo>
                  <h3>{name}</h3>
                  <hr />
                  <p className="description">{description}</p>
                  <Price>${price.toFixed(2)}</Price>
                  <p className="stock">
                    {stock > 0 ? "in stock" : "not in stock"}
                  </p>

                  <Buttons>
                    <ItemButton onClick={() => this.props.history.goBack()}>
                      ← Go Back
                    </ItemButton>
                    {userId === seller.id && (
                      <DeleteButton id={id} history={this.props.history}>
                        Delete This Product
                      </DeleteButton>
                    )}
                    {type === "BUYER" && <ItemButton>Add To Cart</ItemButton>}
                  </Buttons>
                </ProductInfo>
              </SingleItemStyles>
              {this.state.reviews && (
                <ProductReviews productId={id} name={name} />
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default withCookies(SingleItem);
