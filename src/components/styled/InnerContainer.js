import styled from "styled-components";

const InnerContainer = styled.div`
  /* max-width: 500px; */
  margin: 1rem auto;
  /* padding: 3rem; */
  background-color: ${props => props.theme.innerContainerBackground};
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 5px;
  box-shadow: -1px -5px 52px -5px rgba(222, 209, 222, 1);
  @media only screen and (min-width: 768px) {
    /* width: 90%; */
  }
  h2{
    padding: 1rem;
    margin: 1rem;
  }
`;

export default InnerContainer;
