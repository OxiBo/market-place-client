import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.purple};
  margin: 0.5rem;
  min-width: 40px;
  width: 100px;
  min-height: 30px;
  max-width: 70%;
  border-radius: 5px;
  border: none;
  text-transform: uppercase;
  /* padding: 0.8rem 1.5rem; */
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  :hover {
    background-color: ${(props) => props.theme.purpleLight};
  }

`;

export default Button;
