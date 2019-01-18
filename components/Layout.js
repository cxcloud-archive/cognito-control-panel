import Head from "next/head";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header``;
const Main = styled.main``;
const Footer = styled.footer``;

export default ({ children, title = "Cognito Control Panel" }) => (
  <Wrapper>
    <Head>
      <title>{title}</title>
    </Head>
    <Header>Header</Header>
    <Main>{children}</Main>
    <Footer>Footer</Footer>
  </Wrapper>
);
