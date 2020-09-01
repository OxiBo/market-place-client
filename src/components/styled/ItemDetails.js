import styled from "styled-components";

const ItemDetails = styled.div`
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
`;

export default ItemDetails;
