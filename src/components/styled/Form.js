import styled from "styled-components";
// TODO bring color to theme object
const Form = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background-color: #eaf3ee;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.lightGrey};
  border-radius: 5px;
  box-shadow: -1px -5px 52px -5px rgba(222, 209, 222, 1);
  h2 {
    font-size: 4rem;
    a {
      all: inherit;
      display: inline;
      cursor: pointer;
      font-style: italic;
    }
    a:visited{
      color: inherit;
    }
  }
  h3 {
    text-align: center;
    margin: 1rem;
    font-size: 3rem;
    a {
      all: inherit;
      display: inline;
      font-style: italic;
      cursor: pointer;
      padding: 0;
    }
    a:visited{
      color: inherit;
    }
  }

  .fieldset {
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    div {
      /* max-width: 45%; */
      flex: 1;

      /* width: 45%; */
      /* margin: 0.7rem; */
      display: flex;
      justify-content: center;
      align-items: center;
      label {
        padding-right: 1rem;
        /* padding: 0.3rem; */
        width: 40%; /*10rem;*/
        text-align: right;
      }
      div {
        /* width:  */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        input {
          height: 35px;
          /* width: auto; */
          margin: 0.7rem; /*      0.7rem 0.7rem 0.2rem 0.7rem;*/
          padding: 0 1rem;
        }
        input[type="file"] {
          padding-top: 0.7rem;
          padding-bottom: 0;
        }
        p,
        span {
          /* min-height: 20px; */
          width: 100%;
          padding: 0 0.7rem;
          margin: 0 0 0 0.7rem;
          color: red;
          font-size: 1.2rem;
          font-weight: 100;
          font-style: italic;
        }
      }
    }

    label {
      font-weight: 500;
      /* display: flex;
      flex-direction: column */
    }
  }

  fieldset {
    border: none;
    margin: 1rem;
    div {
      padding: 0.5rem;
      label {
        padding: 0.5rem;
      }
    }
  }
  > * {
    margin: 1rem;
    padding: 0.7rem;
  }
`;

export default Form;
