import { createGlobalStyle } from "styled-components";
import { Colors } from "./theme";

export default createGlobalStyle`
  body {
    background-color: ${Colors.alabaster};
  }

  #__next {
    height: 100%;
  }
`;
