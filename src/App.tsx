import "./App.css";
import UserProvider from "./context/userContext";
import RouteProvider from "./components/Routes/RouteProvider";

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
