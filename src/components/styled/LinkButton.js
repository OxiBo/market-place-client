// TODO find out how to fully extend styles to another html element (without having to change any styles)
// NOT USED
import styled from "styled-components";
import Button from "./Button";

const LinkButton = styled(Button).attrs({
  as: "a",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: white;
`;

export default LinkButton;
