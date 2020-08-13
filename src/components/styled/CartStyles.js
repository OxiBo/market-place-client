import styled from "styled-components";

const CartStyles = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  /* left: 0; */
  width: 40%;
  overflow: scroll;
  height: 100%;
  padding: 1rem;
  /* toggle cart visibility */
  transform: translateX(100%);
  transition: all 0.3s;
  ${(props) => props.open && `transform: translateX(0);`};
  background: white;
  border: 2px solid ${(props) => props.theme.lightGrey};
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  /* color: black; */
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
  header {
    text-align: center;
    border-bottom: 5px solid black;
    padding: 1.5rem;
    /* h3 {
      padding: 1.5rem;
      transform: skew(-3deg);
      background: ${(props) => props.theme.purpleLight};
      margin: 0 auto 1rem auto;
      width: 50%;
      text-align: center;
    } */
    p {
      color: black;
    }
  }
  footer {
    border-top: 10px double ${(props) => props.theme.black};
    margin-top: 2rem;
    padding-top: 2rem;
    display: flex;
    justify-content: space-evenly;
    /* grid-template-columns: auto auto; */
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
      color: black;
    }
  }
  main {
    flex: 1;
    color: black;
    /* p{
        color: black;
    } */
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      /* overflow: scroll; */
    }
  }
`;

export default CartStyles;
