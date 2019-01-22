import { createGlobalStyle } from "styled-components";
import { Colors } from "./theme";

export default createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    background-color: ${Colors.alabaster};
  }
  #__next {
    height: 100%;
  }
  .bp3-button {
    outline: none;
  }
  .bp3-form-group label.bp3-label {
    font-weight: 700;
    text-transform: capitalize;
  }
`;
