import styled from "styled-components";

const CartStyles = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  /* left: 0; */
  width: 40%;
  height: 500px;
  /* toggle cart visibility */
  transform: translateX(100%);
  transition: all 0.3s;
  ${(props) => props.open && `transform: translateX(0);`};
  background: white;
  border: 2px solid ${(props) => props.theme.lightGrey};
  z-index: 5;
  color: black;
  display: flex;
  flex-direction: column;
  header {
    /* text-align: center; */
    padding: 1.5rem;
    h3 {
      padding: 1.5rem;
      background: ${(props) => props.theme.purpleLight};
      margin: 0 auto;
      width: 50%;
      text-align: center;
    }
  }
  main {
    flex: 1;
  }
`;

export default CartStyles;
