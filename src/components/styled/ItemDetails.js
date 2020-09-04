import styled from "styled-components";

const ItemDetails = styled.div`
  display: flex;
  border-bottom: 2px solid lightgrey;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    height: 100%;
    object-fit: cover;
    padding: 2rem;
  }
  div {
    flex: 1;
    padding: 1rem;
    a {
      text-decoration: none;
      color: inherit;
    }
    h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
      text-align: center;
    }
    p {
      padding: 0.5rem;

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
