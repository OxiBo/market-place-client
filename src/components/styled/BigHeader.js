import styled from 'styled-components'

const BigHeader = styled.h3`
    padding: 1.5rem;
    transform: skew(-3deg);
    background: ${(props) => props.theme.purpleLight};
    margin: 1rem auto;
    width: 50%;
    text-align: center;
    font-size: 3rem;
  `

  export default BigHeader