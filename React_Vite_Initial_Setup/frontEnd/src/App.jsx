import AddRoutes from "./routes/AddRoutes";
import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AddRoutes />
      </Provider>
    </>
  );
};

export default App;
