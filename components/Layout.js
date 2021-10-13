import Footer from "./Footer";

function Layout(props) {
  return (
    <>
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
