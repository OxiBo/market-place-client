import React from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FETCH_RECENT_ORDER } from "../utils/serverOperations";
import Error from "./ErrorMessage";
import InnerContainer from "./styled/InnerContainer";
import { noImage } from "../utils/utilVars";
import Button from "./styled/Button";
const OrderStyles = styled.div`
  h2 {
    font-size: 2rem;
  }
  .order-details {
    padding: 3rem;
    p {
      padding: 1.5rem;
      border-bottom: 1px solid lightgrey;
      display: flex;
      span {
        font-weight: 700;
      }
      span:first-child {
        width: 25%;
        font-weight: 400;
      }
    }
  }
  .item-details {
    display: flex;
    border-bottom: 2px solid lightgrey;
    margin-bottom: 2rem;
    img {
      width: 300px;
      padding: 2rem;
    }
    div {
      flex: 1;
      padding: 2rem;
      a {
        text-decoration: none;
        color: inherit;
      }
      h3 {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
      }
      p {
        padding: 1rem;

        span {
          padding-left: 1.5rem;
          font-weight: 600;
          a {
            font-size: 2rem;
          }
        }
      }
    }
  }
`;
const Order = (props) => {
  //   console.log(props.match.params.id);
  return (
    <Query query={FETCH_RECENT_ORDER} variables={{ id: props.match.params.id }}>
      {({ data, error, loading }) => {
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading...</p>;
        console.log(data);
        const { id, finishedAt, total, items } = data.order;
        return (
          <InnerContainer>
            <OrderStyles>
              <h2>Order ID: {id}</h2>
              <div className="order-details">
                <p>
                  <span>Date:</span>{" "}
                  <span>
                    {new Date(finishedAt).toLocaleTimeString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  <span>Order Total:</span> <span>${total / 100}</span>
                </p>
                <p>
                  <span>Item Count:</span>{" "}
                  <span>
                    {items.reduce((sum, item) => sum + item.count, 0)}
                  </span>
                </p>
              </div>
              <div>
                {items.map((item) => (
                  <div className="item-details" key={item.id}>
                    <img src={item.image || noImage} alt={item.name} />
                    <div>
                      <Link to={`/item/${item.product.id}`}>
                        {" "}
                        <h3>{item.name} </h3>
                      </Link>
                      <hr />
                      <p>
                        Qty: <span>{item.count}</span>
                      </p>
                      <p>
                        Each: <span>${item.price / 100}</span>
                      </p>
                      <p>
                        SubTotal: <span>{(item.count * item.price) / 100}</span>
                      </p>
                      <p>
                        Sold By:{" "}
                        <span>
                          <Link to={`/seller/${item.product.seller.id}`}>
                            {item.product.seller.name}
                          </Link>
                        </span>
                      </p>
                      {item.reviewed ? (
                        <Button>Update review</Button>
                      ) : (
                        <Link
                          to={{
                            pathname: `/item/${item.product.id}/create-review`,
                            search: `?product=${item.name}`,
                          }}
                        >
                          <Button>Write review</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          </InnerContainer>
        );
      }}
    </Query>
  );
};

export default Order;
