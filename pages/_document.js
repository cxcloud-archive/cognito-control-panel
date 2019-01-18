import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import GlobalStyles from "../styles/global-styles";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            rel='stylesheet'
            href='https://unpkg.com/react-table@latest/react-table.css'
          />
          <link
            href='https://unpkg.com/normalize.css@^7.0.0'
            rel='stylesheet'
          />
          <link
            href='https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css'
            rel='stylesheet'
          />
          <link
            href='https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css'
            rel='stylesheet'
          />
          {this.props.styleTags}
          <GlobalStyles />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
