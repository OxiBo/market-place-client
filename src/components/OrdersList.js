// TODO wrap in HOC to make sure it can only be accessed by buyers ??

import React from "react";
import { Link } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";
import { Query } from "react-apollo";
import styled from "styled-components";
import Error from "./ErrorMessage";
import { FETCH_BUYER_ORDERS } from "../utils/serverOperations";
import InnerContainer from "./styled/InnerContainer";
import { noImage } from "../utils/utilVars";
import formatMoney from "../utils/formatMoney";
const OrderListStyles = styled(InnerContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  margin: 1rem;
  padding: 1rem;
  a {
    text-decoration: none;
  }
  div {
    /* background-color: red; */
    border: 1px solid lightgrey;
    flex: 1 25rem;
    margin: 0.5rem;
    .order-details {
      display: grid;
      grid-gap: 0.5rem;
      grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
      /* display: flex;
      flex-wrap: wrap; */
      p {
        flex: 1 25%;
        background-color: ${(props) => props.theme.lightGrey};
        padding: 1rem;
        margin: 0.5rem;
        display: inline;
        font-weight: 700;
      }
    }
    .images {
      display: grid;
      grid-gap: 0.5rem;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));

      img {
        height: 200px;
        object-fit: cover;
        width: 100%;
      }
    }
  }
`;
const OrdersList = (props) => {
  return (
    <Query query={FETCH_BUYER_ORDERS}>
      {({ data, error, loading }) => {
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading...</p>;
        const { myOrders } = data;
        console.log(myOrders);
        return (
          <InnerContainer>
            <h2>You have {myOrders.length} orders</h2>
            <OrderListStyles>
              {myOrders.map((order) => (
                <div key={order.id}>
                  <Link to={`/order/${order.id}`}>
                    <div className="order-details">
                      <p>
                        {order.items.reduce((sum, item) => sum + item.count, 0)}{" "}
                        items{" "}
                      </p>
                      <p>{order.items.length} products </p>
                      <p>
                        Ordered{" "}
                        {formatDistance(new Date(order.finishedAt), new Date())} ago
                      </p>

                      <p>Total: {order.total / 100}</p>
                    </div>
                    <div className="images">
                      {order.items.map((item) => (
                        <img
                          key={item.id}
                          src={item.image || noImage}
                          alt={item.name}
                        />
                      ))}
                    </div>
                  </Link>
                </div>
              ))}
            </OrderListStyles>
          </InnerContainer>
        );
      }}
    </Query>
  );
};

export default OrdersList;
