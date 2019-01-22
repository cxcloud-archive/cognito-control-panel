import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 0.5rem 1rem;
`;
const Main = styled.main`
  flex: 1;
  padding: 0.5rem 1rem;
`;
const Footer = styled.footer`
  padding: 0.5rem 1rem;
`;

export default ({ children, title = "Cognito Control Panel" }) => (
  <Wrapper>
    <Head>
      <title>{title}</title>
    </Head>
    <Header>
      <Link href={"/"}>
        <a>Home</a>
      </Link>
    </Header>
    <Main>{children}</Main>
    <Footer>Footer</Footer>
  </Wrapper>
);
