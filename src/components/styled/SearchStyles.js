import styled from "styled-components";

export const SearchStyles = styled.div`
  /* width: 100%; */
  background: white;
  /* padding: 0rem; */
  color: black;
  input {
    width: calc(100% - 1rem);
    margin: 0 auto;
    border: 0;
    padding-left: 1rem;
    height: 5rem;
    font-size: 1.5rem;
    box-shadow: inset 1px 1px 15px 0px rgba(222, 209, 222, 0.6);
  }
`;

export const Dropdown = styled.div`
  z-index: 5;
  background-color: white;
  height: auto;
  overflow: scroll;
  /* padding: 1rem; */
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 1rem;
  img {
    width: 70px;
    margin-right: 10px;
  }
  border-left: ${(props) => (props.highlighted ? "5px solid purple" : "")};
  background-color: ${(props) =>
    props.highlighted ? props.theme.hoverOnWhite : ""};
`;
