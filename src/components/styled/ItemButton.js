import styled from "styled-components";
import Button from "./Button";

const ItemButton = styled(Button)`
  /* height: 2rem; */
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* padding: 0.5rem; */
    width: 100%;
    color: white;
    text-decoration: none;
    font-size: 1rem;
  }
`;

export default ItemButton;
