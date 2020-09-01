import styled from "styled-components";

const SmallContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background-color: #eaf3ee;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 5px;
  box-shadow: -1px -5px 52px -5px rgba(222, 209, 222, 1);
`;
export default SmallContainer;
