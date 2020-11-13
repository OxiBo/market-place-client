import styled from "styled-components";

const ItemDetails = styled.div`
  display: flex;
  border-bottom: 2px solid lightgrey;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    height: 100%;
    object-fit: cover;
    padding: 0;
  }
  div {
    flex: 1;
    padding: 0 0.5rem;
    div {
      a {
        text-decoration: none;
        color: inherit;
      }
      h3 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
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
      p.info {
        color: red;
        font-style: italic;
      }
    }
  }
`;

export default ItemDetails;
