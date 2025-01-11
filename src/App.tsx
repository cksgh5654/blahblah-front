import UserProvider from "@context/userContext";
import RouteProvider from "@components/Routes/RouteProvider";
import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <RouteProvider />
      </UserProvider>
    </>
  );
}

export default App;
