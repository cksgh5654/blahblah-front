import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useEffect } from "react";
import { useUserContext } from "./context/userContext";
import { getSigninStatus } from "./apis/auth.api";

function App() {
  const { updateUser } = useUserContext();
  useEffect(() => {
    getSigninStatus() //
      .then(({ user, signinStatus }) => {
        updateUser(user);
        localStorage.signinStatus = signinStatus;
      });
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
