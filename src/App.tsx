import UserProvider from "@context/userContext";
import RouteProvider from "@components/Routes/RouteProvider";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <UserProvider>
        <RouteProvider />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
