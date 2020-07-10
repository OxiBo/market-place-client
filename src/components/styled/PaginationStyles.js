import styled from "styled-components";

const PaginationStyles = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 1rem auto;
  max-width: 80%;
  border: 1px solid lightgrey;
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid lightgrey;
    &:last-child {
      border-right: 0;
    }
  }
  a,
  a:visited {
    text-decoration: none;
    color: ${(props) => props.theme.fontColor};
  }

  a[aria-disabled="true"] {
    color: grey;
    pointer-events: none;
  }
  @media only screen and (max-width: 768px) {
    max-width: 95%;
    & > * {
      margin: 0;
      padding: 10px 15px;
    }
  }
`;

export default PaginationStyles;
