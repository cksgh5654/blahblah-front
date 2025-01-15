import { Outlet } from "react-router-dom";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

const BaseLayout = () => {
  return (
    <ScrollToTop>
      <Header />
      <Outlet />
    </ScrollToTop>
  );
};

export default BaseLayout;
