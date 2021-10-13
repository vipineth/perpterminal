import Footer from "./Footer";
import Head from "next/head";

function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
