import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListItem = styled.div`
  width: 95%;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid lightgrey;
  img {
    width: 150px;
  }
`;
const Info = styled.div`
  padding: 1rem;
  flex: 1;
  border-left: 2px solid lightgrey;
  a {
    display: block;
    text-decoration: none;
    font-size: 3rem;
    text-align: center;
    font-weight: 700;
    margin: 0 auto;
    color: black;
  }
  /* h2 {
    text-align: center;
    font-size: 2rem;
  } */
  p {
    margin: 1rem;
    span {
      font-size: 2rem;
      font-weight: 500;
    }
  }
`;

const SellerShort = ({ seller: { id, name, image, email } }) => {
  //   console.log(email);
  return (
    <ListItem>
      <img src={image} alt={name} />
      <Info>
        <Link to={`/seller/${id}`}> {name}</Link>

        <p>
          EMAIL: <span>{email}</span>
        </p>
        <p>Some seller info</p>
      </Info>
    </ListItem>
  );
};

export default SellerShort;
